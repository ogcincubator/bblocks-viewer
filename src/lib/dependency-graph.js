import dagre from 'dagre';
import { getLabel as getItemClassLabel } from '@/models/itemClass';

function initGraph(nodeSize) {
  const g = {
    nodes: {},
    edges: {},
    layouts: { nodes: {} },
    usedRegisters: {},
    usedItemClasses: {},
  };
  const dg = new dagre.graphlib.Graph();
  dg.setGraph({ rankdir: 'TB', nodesep: nodeSize, edgesep: nodeSize, ranksep: nodeSize });
  dg.setDefaultEdgeLabel(() => ({}));
  return { g, dg };
}

function addNode(g, dg, id, bblock, nodeSize) {
  if (g.nodes[id]) return;
  if (bblock?.register?.url && !g.usedRegisters[bblock.register.url]) {
    g.usedRegisters[bblock.register.url] = bblock.register;
  }
  if (bblock?.itemClass && !g.usedItemClasses[bblock.itemClass]) {
    g.usedItemClasses[bblock.itemClass] = getItemClassLabel(bblock.itemClass);
  }
  const name = bblock?.name || id;
  g.nodes[id] = { id, name, color: bblock?.register?.color || 'gray' };
  dg.setNode(id, {
    label: name,
    width: Math.max(nodeSize, name.length * 5.2),
    height: nodeSize + 12,
  });
}

function addEdge(g, dg, fromId, toId, type) {
  toId = toId.replace(/^bblocks:\/\//, '');
  const edgeId = `${fromId}-${toId}`;
  if (!g.edges[edgeId]) {
    g.edges[edgeId] = { source: fromId, target: toId, type };
    dg.setEdge(fromId, toId);
  }
  return toId;
}

function applyLayout(g, dg) {
  dagre.layout(dg);
  dg.nodes().forEach(nodeId => {
    const dgNode = dg.node(nodeId);
    if (dgNode) g.layouts.nodes[nodeId] = { x: dgNode.x, y: dgNode.y };
  });
}

export function buildSingleGraph(bblockId, allBBlocks, mode, nodeSize) {
  const { g, dg } = initGraph(nodeSize);
  g.layouts.nodes[bblockId] = { x: 0, y: 0, fixed: true };

  const seen = new Set();
  const pending = [bblockId];
  let curId;

  while ((curId = pending.pop())) {
    if (seen.has(curId)) continue;

    let cur = allBBlocks[curId];
    if (!cur) {
      cur = { local: false, name: curId };
    }
    addNode(g, dg, curId, allBBlocks[curId] || null, nodeSize);

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
        const baseId = addEdge(g, dg, curId, extensionPoints.baseBuildingBlock, 'extends');
        addedExtensions.push(baseId);
        if (!seen.has(baseId)) pending.push(baseId);

        Object.entries(extensionPoints.extensions).forEach(([extSource, extTarget]) => {
          const targetId = addEdge(g, dg, curId, extTarget, 'extensionTarget');
          const sourceId = addEdge(g, dg, extTarget, extSource, 'extensionSource');
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
            addEdge(g, dg, curId, dep, 'isProfileOf');
            profileOfDeps.push(depId);
            if (!seen.has(depId)) pending.push(depId);
          }
        });
      }

      cur.dependsOn?.forEach(dep => {
        const depId = dep.replace(/^bblocks:\/\//, '');
        if (!addedExtensions.includes(depId) && !profileOfDeps.includes(depId)) {
          addEdge(g, dg, curId, dep, 'dependsOn');
          if (!seen.has(depId)) pending.push(depId);
        }
      });
    }

    seen.add(curId);
  }

  applyLayout(g, dg);
  return g;
}

export function buildMultiGraph(bblockIds, allBBlocks, nodeSize) {
  const { g, dg } = initGraph(nodeSize);
  const localSet = new Set(bblockIds);

  for (const id of bblockIds) {
    addNode(g, dg, id, allBBlocks[id] || null, nodeSize);
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
          addEdge(g, dg, id, dep, 'isProfileOf');
          profileOfDeps.push(depId);
        }
      });
    }

    bblock.dependsOn?.forEach(dep => {
      const depId = dep.replace(/^bblocks:\/\//, '');
      if (!profileOfDeps.includes(depId) && localSet.has(depId)) {
        addEdge(g, dg, id, dep, 'dependsOn');
      }
    });
  }

  applyLayout(g, dg);
  return g;
}