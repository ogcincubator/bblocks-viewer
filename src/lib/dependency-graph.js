import dagre from 'dagre';
import { computeForceLayout } from '@/lib/graph-layout';
import { getLabel as getItemClassLabel } from '@/models/itemClass';
import { bblockIdFromUri } from '@/lib/utils';

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

// Both ends are normalized: node IDs are always stored stripped, so an edge that kept a
// bblocks:// prefix on either side would reference a node that doesn't exist and break the
// force layout ("node not found").
function addEdge(g, fromId, toId, type) {
  fromId = bblockIdFromUri(fromId);
  toId = bblockIdFromUri(toId);
  const edgeId = `${fromId}-${toId}`;
  if (!g.edges[edgeId]) {
    g.edges[edgeId] = { source: fromId, target: toId, type };
  }
  return toId;
}

// hasFormat is symmetric (A is an alternate format of B implies the reverse too), so - unlike
// the directed relations above - both directions are collapsed into a single edge keyed by the
// sorted pair, rather than rendering two separate arrows between the same two nodes.
function addUndirectedEdge(g, fromId, toId, type) {
  fromId = bblockIdFromUri(fromId);
  toId = bblockIdFromUri(toId);
  const edgeId = [fromId, toId].sort().join('~');
  if (!g.edges[edgeId]) {
    g.edges[edgeId] = { source: fromId, target: toId, type };
  }
  return toId;
}

/**
 * Computes and stores node positions for the graph built so far, via a d3-force
 * radial layout. `fixedNodeId`, if given, is pinned at the origin for the layout
 * pass only (e.g. to keep the "current" bblock centered) — once computed, every
 * node is freely draggable. `aspectRatio` stretches the layout horizontally to
 * match the container it'll be rendered into (see computeForceLayout).
 */
function applyForceLayout(g, nodeSize, fixedNodeId, aspectRatio) {
  const layoutNodes = Object.values(g.nodes).map(n => ({
    id: n.id,
    width: Math.max(nodeSize, measureTextWidth(n.name) + 8),
    height: nodeSize + 12,
  }));
  const layoutEdges = Object.values(g.edges).map(e => ({ source: e.source, target: e.target }));
  g.layouts.nodes = computeForceLayout(layoutNodes, layoutEdges, { nodeSize, fixedNodeId, aspectRatio });
}

/**
 * Computes and stores node positions via dagre's rank-based (top-to-bottom) layout —
 * used for the single-bblock dependency graph, whose usual shape (focus node with
 * dependencies fanning out below, and any dependents above) reads better as ranked
 * rows than as the d3-force radial layout used elsewhere.
 */
function applyDagreLayout(g, nodeSize) {
  const dg = new dagre.graphlib.Graph();
  dg.setGraph({ rankdir: 'TB', nodesep: nodeSize, edgesep: nodeSize, ranksep: nodeSize });
  dg.setDefaultEdgeLabel(() => ({}));

  Object.values(g.nodes).forEach(n => {
    dg.setNode(n.id, {
      width: Math.max(nodeSize, measureTextWidth(n.name) + 8),
      height: nodeSize + 12,
    });
  });
  Object.values(g.edges).forEach(e => {
    dg.setEdge(e.source, e.target);
  });

  dagre.layout(dg);
  dg.nodes().forEach(nodeId => {
    const dgNode = dg.node(nodeId);
    if (dgNode) g.layouts.nodes[nodeId] = { x: dgNode.x, y: dgNode.y };
  });
}

// Above this many nodes, "simplified" mode's recursive local-only expansion (see below)
// can still produce an unreadably dense graph, so buildSingleGraph() falls back to
// showing only the focus bblock's direct dependencies.
const SIMPLIFIED_NODE_LIMIT = 20;

function buildSingleGraphOnce(bblockId, allBBlocks, mode, shallow) {
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
    } else if (shallow) {
      // Fallback for oversized graphs: only the focus node's direct dependencies,
      // regardless of locality, instead of recursing through every local dependency.
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
          const depId = bblockIdFromUri(dep);
          if (!addedExtensions.includes(depId)) {
            addEdge(g, curId, dep, 'isProfileOf');
            profileOfDeps.push(depId);
            if (!seen.has(depId)) pending.push(depId);
          }
        });
      }

      cur.dependsOn?.forEach(dep => {
        const depId = bblockIdFromUri(dep);
        if (!addedExtensions.includes(depId) && !profileOfDeps.includes(depId)) {
          addEdge(g, curId, dep, 'dependsOn');
          if (!seen.has(depId)) pending.push(depId);
        }
      });

      cur.hasFormat?.forEach(dep => {
        const depId = bblockIdFromUri(dep);
        addUndirectedEdge(g, curId, dep, 'hasFormat');
        if (!seen.has(depId)) pending.push(depId);
      });
    }

    seen.add(curId);
  }

  return g;
}

export function buildSingleGraph(bblockId, allBBlocks, mode, nodeSize) {
  let g = buildSingleGraphOnce(bblockId, allBBlocks, mode, false);

  if (mode === 'simplified' && Object.keys(g.nodes).length > SIMPLIFIED_NODE_LIMIT) {
    g = buildSingleGraphOnce(bblockId, allBBlocks, mode, true);
  }

  // extensionPoints/jsonld-context are narrow, purpose-built views (schema substitution /
  // context provenance respectively) where mixing in unrelated dependents would be noise
  // rather than useful context, so this only runs for the general-purpose modes.
  if (mode !== 'extensionPoints' && mode !== 'jsonld-context') {
    addDependents(g, bblockId, allBBlocks);
  }

  applyDagreLayout(g, nodeSize);
  return g;
}

/**
 * Adds incoming edges for every other bblock that declares `isProfileOf`/`dependsOn` pointing
 * at `bblockId` - i.e. what depends on the focus block, as opposed to what it depends on.
 * Only computed for the focus node itself (not recursively for each dependent's own
 * dependents), matching how `extensionPoints` is likewise only expanded for the current node,
 * to keep this bounded to one extra "hop" rather than pulling in a second full graph.
 */
/**
 * Adds incoming edges for every other bblock that declares `isProfileOf`/`dependsOn`/`hasFormat`
 * pointing at `bblockId` - i.e. what depends on (or is an alternate format of) the focus block,
 * as opposed to what it points at itself. Only computed for the focus node itself (not
 * recursively for each dependent's own dependents), matching how `extensionPoints` is likewise
 * only expanded for the current node, to keep this bounded to one extra "hop" rather than
 * pulling in a second full graph.
 */
function addDependents(g, bblockId, allBBlocks) {
  Object.entries(allBBlocks).forEach(([id, bblock]) => {
    if (id === bblockId) return;
    const profileOf = bblock?.isProfileOf || bblock?.profileOf;
    const profiles = profileOf ? (Array.isArray(profileOf) ? profileOf : [profileOf]) : [];
    if (!g.edges[`${id}-${bblockId}`] && profiles.some(dep => bblockIdFromUri(dep) === bblockId)) {
      addNode(g, id, bblock);
      addEdge(g, id, bblockId, 'isProfileOf');
    } else if (!g.edges[`${id}-${bblockId}`] && bblock?.dependsOn?.some(dep => bblockIdFromUri(dep) === bblockId)) {
      addNode(g, id, bblock);
      addEdge(g, id, bblockId, 'dependsOn');
    }
    // hasFormat is symmetric, so also pick up siblings that only declare the relation from
    // their own side, even if the focus block didn't declare it back.
    if (bblock?.hasFormat?.some(dep => bblockIdFromUri(dep) === bblockId)) {
      addNode(g, id, bblock);
      addUndirectedEdge(g, id, bblockId, 'hasFormat');
    }
  });
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
  return deps.map(dep => bblockIdFromUri(dep));
}

/**
 * Traces where a bblock's assembled JSON-LD context comes from: walks the full dependency chain
 * (dependsOn/isProfileOf, transitively) but only includes blocks that define their own
 * sourceLdContext, connecting each one to the nearest such ancestor (which may be the root
 * itself) so that context-less intermediate dependencies are skipped over.
 */
export function buildJsonLdContextSourceGraph(bblockId, allBBlocks, nodeSize) {
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

  applyDagreLayout(g, nodeSize);
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
        const depId = bblockIdFromUri(dep);
        if (localSet.has(depId)) {
          addEdge(g, id, dep, 'isProfileOf');
          profileOfDeps.push(depId);
        }
      });
    }

    bblock.dependsOn?.forEach(dep => {
      const depId = bblockIdFromUri(dep);
      if (!profileOfDeps.includes(depId) && localSet.has(depId)) {
        addEdge(g, id, dep, 'dependsOn');
      }
    });

    bblock.hasFormat?.forEach(dep => {
      const depId = bblockIdFromUri(dep);
      if (localSet.has(depId)) {
        addUndirectedEdge(g, id, dep, 'hasFormat');
      }
    });
  }

  applyForceLayout(g, nodeSize, undefined, aspectRatio);
  return g;
}
