import { forceSimulation, forceManyBody, forceLink, forceCenter, forceX, forceY, forceRadial } from 'd3-force';

/**
 * d3-force's built-in forceCollide only supports a single (circular) radius per
 * node, so it can't prefer horizontal separation over vertical. This is a small
 * custom force following the same `.initialize(nodes)` + callable convention: each
 * node gets an elliptical keep-out zone (`rx` wide, `ry` tall), checked pairwise
 * (fine at the node counts these graphs have — a few dozen at most) by normalizing
 * the distance between two nodes into "ellipse space" (dividing by each axis's
 * combined radii) and pushing them apart along that direction if they overlap.
 */
function forceEllipseCollide(getRadii, strength = 0.9, iterations = 2) {
  let nodes;
  function force() {
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const { rx: arx, ry: ary } = getRadii(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const { rx: brx, ry: bry } = getRadii(b);
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          if (dx === 0 && dy === 0) {
            dx = (Math.random() - 0.5) * 1e-3;
            dy = (Math.random() - 0.5) * 1e-3;
          }
          const sumRx = arx + brx;
          const sumRy = ary + bry;
          const nx = dx / sumRx;
          const ny = dy / sumRy;
          const ellipseDist = Math.hypot(nx, ny);
          if (ellipseDist > 0 && ellipseDist < 1) {
            const overlap = (1 - ellipseDist) * strength * 0.5;
            const pushX = (nx / ellipseDist) * sumRx * overlap;
            const pushY = (ny / ellipseDist) * sumRy * overlap;
            if (a.fx == null) a.x -= pushX;
            if (a.fy == null) a.y -= pushY;
            if (b.fx == null) b.x += pushX;
            if (b.fy == null) b.y += pushY;
          }
        }
      }
    }
  }
  force.initialize = (_nodes) => { nodes = _nodes; };
  return force;
}

/**
 * BFS traversal from `rootId` (direction-agnostic): distance in edge-hops to every
 * reachable node, plus a spanning tree (first-discovered parent/children) used only
 * to seed initial angles — the simulation still uses the full edge set for forces.
 */
function bfsTree(rootId, nodeIds, edges) {
  const adjacency = Object.fromEntries(nodeIds.map(id => [id, []]));
  edges.forEach(e => {
    adjacency[e.source]?.push(e.target);
    adjacency[e.target]?.push(e.source);
  });

  const depths = { [rootId]: 0 };
  const children = { [rootId]: [] };
  const queue = [rootId];
  let head = 0;
  while (head < queue.length) {
    const id = queue[head++];
    for (const neighbor of adjacency[id] || []) {
      if (!(neighbor in depths)) {
        depths[neighbor] = depths[id] + 1;
        children[neighbor] = [];
        children[id].push(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return { depths, children };
}

/**
 * Angle (radians) for each reachable node, recursively subdividing the full circle
 * among a node's children proportionally to their subtree size. Seeding initial
 * positions from this instead of an arbitrary spiral keeps each dependency subtree
 * in its own angular wedge, which is what actually keeps edges from crossing between
 * unrelated branches and keeps a branch's labels grouped instead of interleaved with
 * a neighboring branch's.
 */
function assignAngles(rootId, children) {
  const angles = {};
  const subtreeSizeCache = {};
  function subtreeSize(id) {
    if (id in subtreeSizeCache) return subtreeSizeCache[id];
    const size = 1 + (children[id] || []).reduce((sum, c) => sum + subtreeSize(c), 0);
    subtreeSizeCache[id] = size;
    return size;
  }
  function assign(id, startAngle, endAngle) {
    angles[id] = (startAngle + endAngle) / 2;
    const kids = children[id] || [];
    if (!kids.length) return;
    const totalSize = kids.reduce((sum, c) => sum + subtreeSize(c), 0);
    let a = startAngle;
    kids.forEach(kid => {
      const span = (endAngle - startAngle) * (subtreeSize(kid) / totalSize);
      assign(kid, a, a + span);
      a += span;
    });
  }
  assign(rootId, 0, 2 * Math.PI);
  return angles;
}

/**
 * Radius to place each BFS depth's ring at, sized so a ring's circumference actually
 * fits the nodes assigned to it (rather than a flat `depth * spacing`, which crams
 * same-depth nodes together once a ring has more than a handful of members) — with a
 * minimum gap between consecutive rings so dense outer rings can't creep inward and
 * collide with the ring before them.
 */
function ringRadii(depths, simNodes, nodeSize) {
  const byDepth = {};
  simNodes.forEach(n => {
    const d = depths[n.id];
    if (d === undefined) return;
    (byDepth[d] ||= []).push(n);
  });
  const maxDepth = Math.max(0, ...Object.keys(byDepth).map(Number));
  const minRingGap = nodeSize * 4;

  const radii = { 0: 0 };
  let prevRadius = 0;
  for (let d = 1; d <= maxDepth; d++) {
    const ringNodes = byDepth[d] || [];
    const neededCircumference = ringNodes.reduce((sum, n) => sum + n.collisionRadius * 2 + nodeSize, 0);
    const radius = Math.max(prevRadius + minRingGap, neededCircumference / (2 * Math.PI));
    radii[d] = radius;
    prevRadius = radius;
  }
  return { radii, maxDepth, fallbackRadius: prevRadius + minRingGap };
}

/**
 * Computes stabilized 2D positions for a node-link graph using a d3-force simulation
 * run synchronously to convergence (not animated tick-by-tick), so callers get an
 * already-settled layout instead of one that visibly wiggles into place.
 *
 * Swap this implementation out (e.g. back to a dagre-based one) without touching
 * callers, as long as it keeps this signature: nodes in, `{ [id]: {x, y} }` out.
 *
 * @param {Array<{id: string, width: number, height: number}>} nodes
 * @param {Array<{source: string, target: string}>} edges
 * @param {object} [options]
 * @param {number} [options.nodeSize] - base node size, used to scale spacing forces
 * @param {string} [options.fixedNodeId] - node pinned at the origin for the whole simulation
 * @param {number} [options.aspectRatio] - width/height to stretch the final layout to
 *   (e.g. the container's actual aspect ratio), so a naturally roundish radial layout
 *   fills a wide desktop viewport instead of leaving its sides empty
 * @param {number} [options.horizontalInflation] - how much wider than tall each node's
 *   keep-out zone is during collision resolution, so the simulation itself prefers
 *   spreading nodes side by side over stacking them vertically
 * @returns {Record<string, {x: number, y: number}>}
 */
export function computeForceLayout(nodes, edges, { nodeSize = 30, fixedNodeId, aspectRatio = 1, horizontalInflation = 1.4 } = {}) {
  const nodeIds = nodes.map(n => n.id);
  const hasRoot = fixedNodeId && nodeIds.includes(fixedNodeId);

  let depths, radii, maxDepth, fallbackRadius, angles;
  if (hasRoot) {
    const tree = bfsTree(fixedNodeId, nodeIds, edges);
    depths = tree.depths;
    angles = assignAngles(fixedNodeId, tree.children);
  }

  const simNodes = nodes.map((n, i) => {
    const width = n.width;
    const height = n.height;
    // Collision radius covers the node circle plus its label footprint. Which of the
    // 8 compass directions the label actually renders in is decided later, per node,
    // by v-network-graph's own directionAutoAdjustment (based on that node's edges) —
    // our layout has no say in it and can't predict it. So instead of assuming one
    // direction, treat the footprint as a rectangle that reserves the label's full
    // height above *and* below the node, and its full width to both sides, and use
    // that rectangle's diagonal as the radius. A circle is already symmetric in every
    // direction, so this single radius ends up safe for all 8 placements at once,
    // including the diagonals a min/max of the two axes alone would underestimate.
    const collisionRadius = Math.hypot(width / 2, nodeSize / 2 + height) + nodeSize * 0.3;
    // Per-axis keep-out radii for the elliptical collision force below: `rx` is
    // deliberately inflated so nodes prefer spacing out sideways rather than
    // stacking, `ry` stays true to the actual vertical footprint.
    const rx = Math.max(nodeSize / 2, width / 2) * horizontalInflation + nodeSize * 0.3;
    const ry = nodeSize / 2 + height + nodeSize * 0.3;
    let x, y;
    if (hasRoot && n.id in depths) {
      // Seed from the BFS-tree angle/ring instead of an arbitrary spiral, so the
      // simulation starts from (and mostly just relaxes) a sensible radial-tree
      // layout rather than having to untangle a random one.
      const angle = angles[n.id];
      x = Math.cos(angle);
      y = Math.sin(angle);
    } else {
      // Deterministic fallback (golden-angle spiral) for unreachable nodes, or for
      // graphs with no fixed root (e.g. multi-bblock mode) — reproducible across
      // reloads, unlike Math.random(), and spreads nodes out from the start.
      const angle = i * 2.399963;
      const radius = nodeSize * 0.9 * Math.sqrt(i);
      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);
    }
    return { id: n.id, width, height, collisionRadius, rx, ry, x, y };
  });
  const nodesById = Object.fromEntries(simNodes.map(n => [n.id, n]));

  if (hasRoot) {
    ({ radii, maxDepth, fallbackRadius } = ringRadii(depths, simNodes, nodeSize));
    // Scale the angle-only seed positions above out to their ring radius now that
    // ring radii (which depend on node sizes) are known.
    simNodes.forEach(n => {
      const r = radii[depths[n.id] ?? maxDepth + 1] ?? fallbackRadius;
      const angle = Math.atan2(n.y, n.x);
      n.x = r * Math.cos(angle);
      n.y = r * Math.sin(angle);
    });
    const fixedNode = nodesById[fixedNodeId];
    fixedNode.x = 0;
    fixedNode.y = 0;
    fixedNode.fx = 0;
    fixedNode.fy = 0;
  }

  const linkDistance = (link) => {
    const a = nodesById[link.source.id ?? link.source];
    const b = nodesById[link.target.id ?? link.target];
    return (a?.collisionRadius || nodeSize) + (b?.collisionRadius || nodeSize) + nodeSize;
  };

  const simulation = forceSimulation(simNodes)
    .force('link', forceLink(edges).id(d => d.id).distance(linkDistance).strength(0.6))
    .force('charge', forceManyBody().strength(-nodeSize * 12))
    .force('collide', forceEllipseCollide(d => ({ rx: d.rx, ry: d.ry })))
    .stop();

  if (hasRoot) {
    // Arrange nodes in concentric rings by BFS distance from the pinned root instead
    // of a generic centering pull. This keeps the root visually centered (rather than
    // just one point in an asymmetric blob) and, since edges then mostly run radially
    // outward between adjacent rings instead of at arbitrary angles, cuts down on the
    // edge crossings that a plain repulsion/attraction layout tends to produce for
    // tree-like dependency graphs.
    simulation.force('radial', forceRadial(
      d => radii[depths[d.id] ?? maxDepth + 1] ?? fallbackRadius,
      0, 0
    ).strength(d => d.id === fixedNodeId ? 0 : 0.7));
  } else {
    simulation
      .force('x', forceX(0).strength(0.02))
      .force('y', forceY(0).strength(0.02))
      .force('center', forceCenter(0, 0));
  }

  // Run to convergence up-front rather than animating: enough ticks for alpha to
  // decay well past the simulation's stop threshold on graphs of this size.
  const numTicks = Math.min(600, Math.max(300, simNodes.length * 6));
  for (let i = 0; i < numTicks; i++) {
    simulation.tick();
  }

  // Stretch horizontally to match the container's aspect ratio: a roughly circular
  // radial layout otherwise wastes the sides of a wide, short viewport. Safe to do
  // as a uniform post-process — it only increases (never decreases) the distance
  // between any two points that aren't purely vertically aligned, so it can't
  // introduce overlap that collision resolution had already ruled out.
  if (aspectRatio > 1) {
    simNodes.forEach(n => { n.x *= aspectRatio; });
  }

  return Object.fromEntries(simNodes.map(n => [n.id, { x: n.x, y: n.y }]));
}
