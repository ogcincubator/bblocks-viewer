import { computeForceLayout } from '@/lib/graph-layout';
import { getLabel as getItemClassLabel } from '@/models/itemClass';

// v-network-graph's default node-label font (see its ViewConfig defaults); kept in
// sync manually since DependencyViewer.vue doesn't currently override it.
const LABEL_FONT = '11px sans-serif';
let measureCtx = null;

/**
 * Real rendered width of a label, via a scratch <canvas> 2D context, instead of a
 * `text.length * constant` guess — character widths vary too much (narrow "i"/"l"
 * vs wide "M"/"W", punctuation, etc.) for a flat multiplier to size collision
 * spacing accurately, which was letting same-size guesses under- or over-space
 * labels depending on their actual content.
 */
function measureTextWidth(text) {
  if (typeof document === 'undefined') {
    return text.length * 5.2; // non-browser fallback (e.g. SSR/tests)
  }
  if (!measureCtx) {
    measureCtx = document.createElement('canvas').getContext('2d');
  }
  measureCtx.font = LABEL_FONT;
  return measureCtx.measureText(text).width;
}

function initGraph() {
  return {
    nodes: {},
    edges: {},
    layouts: { nodes: {} },
    usedRegisters: {},
    usedItemClasses: {},
  };
}

function addNode(g, id, bblock) {
  if (g.nodes[id]) return;
  if (bblock?.register?.url && !g.usedRegisters[bblock.register.url]) {
    g.usedRegisters[bblock.register.url] = bblock.register;
  }
  if (bblock?.itemClass && !g.usedItemClasses[bblock.itemClass]) {
    g.usedItemClasses[bblock.itemClass] = getItemClassLabel(bblock.itemClass);
  }
  const name = bblock?.name || id;
  g.nodes[id] = { id, name, color: bblock?.register?.color || 'gray' };
}

function addEdge(g, fromId, toId, type) {
  toId = toId.replace(/^bblocks:\/\//, '');
  const edgeId = `${fromId}-${toId}`;
  if (!g.edges[edgeId]) {
    g.edges[edgeId] = { source: fromId, target: toId, type };
  }
  return toId;
}

/**
 * Computes and stores node positions for the graph built so far. `fixedNodeId`, if
 * given, is pinned at the origin for the layout pass only (e.g. to keep the
 * "current" bblock centered) — once computed, every node is freely draggable.
 * `aspectRatio` stretches the layout horizontally to match the container it'll be
 * rendered into (see computeForceLayout).
 */
function applyLayout(g, nodeSize, fixedNodeId, aspectRatio) {
  const layoutNodes = Object.values(g.nodes).map(n => ({
    id: n.id,
    width: Math.max(nodeSize, measureTextWidth(n.name) + 8),
    height: nodeSize + 12,
  }));
  const layoutEdges = Object.values(g.edges).map(e => ({ source: e.source, target: e.target }));
  g.layouts.nodes = computeForceLayout(layoutNodes, layoutEdges, { nodeSize, fixedNodeId, aspectRatio });
}

export function buildSingleGraph(bblockId, allBBlocks, mode, nodeSize, aspectRatio) {
  const g = initGraph();

  const seen = new Set();
  const pending = [bblockId];
  let curId;

  while ((curId = pending.pop())) {
    if (seen.has(curId)) continue;

    let cur = allBBlocks[curId];
    if (!cur) {
      cur = { local: false, name: curId };
    }
    addNode(g, curId, allBBlocks[curId] || null);

    const nodeType = curId === bblockId ? 'current' : (cur.local ? 'local' : 'remote');
    let showNodeDependencies;
    if (mode === 'full') {
      showNodeDependencies = true;
    } else if (mode === 'extensionPoints') {
      showNodeDependencies = nodeType === 'current';
    } else {
      showNodeDependencies = cur.local;
    }

    if (showNodeDependencies) {
      const extensionPoints = curId === bblockId ? allBBlocks[bblockId]?.extensionPoints : null;
      const addedExtensions = [];

      if (extensionPoints) {
        const baseId = addEdge(g, curId, extensionPoints.baseBuildingBlock, 'extends');
        addedExtensions.push(baseId);
        if (!seen.has(baseId)) pending.push(baseId);

        Object.entries(extensionPoints.extensions).forEach(([extSource, extTarget]) => {
          const targetId = addEdge(g, curId, extTarget, 'extensionTarget');
          const sourceId = addEdge(g, extTarget, extSource, 'extensionSource');
          addedExtensions.push(sourceId, targetId);
          if (!seen.has(targetId)) pending.push(targetId);
          if (!seen.has(sourceId)) pending.push(sourceId);
        });
      }

      const profileOfDeps = [];
      const profileOf = cur.isProfileOf || cur.profileOf;
      if (profileOf) {
        const profiles = Array.isArray(profileOf) ? profileOf : [profileOf];
        profiles.forEach(dep => {
          const depId = dep.replace(/^bblocks:\/\//, '');
          if (!addedExtensions.includes(depId)) {
            addEdge(g, curId, dep, 'isProfileOf');
            profileOfDeps.push(depId);
            if (!seen.has(depId)) pending.push(depId);
          }
        });
      }

      cur.dependsOn?.forEach(dep => {
        const depId = dep.replace(/^bblocks:\/\//, '');
        if (!addedExtensions.includes(depId) && !profileOfDeps.includes(depId)) {
          addEdge(g, curId, dep, 'dependsOn');
          if (!seen.has(depId)) pending.push(depId);
        }
      });
    }

    seen.add(curId);
  }

  applyLayout(g, nodeSize, bblockId, aspectRatio);
  return g;
}

function getDepIds(bblock) {
  if (!bblock) {
    return [];
  }
  const deps = [];
  const profileOf = bblock.isProfileOf || bblock.profileOf;
  if (profileOf) {
    (Array.isArray(profileOf) ? profileOf : [profileOf]).forEach(dep => deps.push(dep));
  }
  bblock.dependsOn?.forEach(dep => deps.push(dep));
  return deps.map(dep => dep.replace(/^bblocks:\/\//, ''));
}

/**
 * Traces where a bblock's assembled JSON-LD context comes from: walks the full dependency chain
 * (dependsOn/isProfileOf, transitively) but only includes blocks that define their own
 * sourceLdContext, connecting each one to the nearest such ancestor (which may be the root
 * itself) so that context-less intermediate dependencies are skipped over.
 */
export function buildJsonLdContextSourceGraph(bblockId, allBBlocks, nodeSize, aspectRatio) {
  const g = initGraph();
  const root = allBBlocks[bblockId];
  addNode(g, bblockId, root);

  const visited = new Set([bblockId]);

  function visit(id, anchorId) {
    if (visited.has(id)) {
      return;
    }
    visited.add(id);
    const bblock = allBBlocks[id];
    let nextAnchor = anchorId;
    if (bblock?.sourceLdContext) {
      addNode(g, id, bblock);
      addEdge(g, anchorId, id);
      nextAnchor = id;
    }
    getDepIds(bblock).forEach(depId => visit(depId, nextAnchor));
  }

  getDepIds(root).forEach(depId => visit(depId, bblockId));

  applyLayout(g, nodeSize, bblockId, aspectRatio);
  return g;
}

export function buildMultiGraph(bblockIds, allBBlocks, nodeSize, aspectRatio) {
  const g = initGraph();
  const localSet = new Set(bblockIds);

  for (const id of bblockIds) {
    addNode(g, id, allBBlocks[id] || null);
  }

  for (const id of bblockIds) {
    const bblock = allBBlocks[id];
    if (!bblock) continue;

    const profileOfDeps = [];
    const profileOf = bblock.isProfileOf || bblock.profileOf;
    if (profileOf) {
      const profiles = Array.isArray(profileOf) ? profileOf : [profileOf];
      profiles.forEach(dep => {
        const depId = dep.replace(/^bblocks:\/\//, '');
        if (localSet.has(depId)) {
          addEdge(g, id, dep, 'isProfileOf');
          profileOfDeps.push(depId);
        }
      });
    }

    bblock.dependsOn?.forEach(dep => {
      const depId = dep.replace(/^bblocks:\/\//, '');
      if (!profileOfDeps.includes(depId) && localSet.has(depId)) {
        addEdge(g, id, dep, 'dependsOn');
      }
    });
  }

  applyLayout(g, nodeSize, undefined, aspectRatio);
  return g;
}
