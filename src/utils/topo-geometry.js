import * as THREE from 'three';
import earcut from 'earcut';

const COORDINATE_DIMENSIONS = 3;
const NORMAL_X_AXIS_THRESHOLD = 0.9;
const POSITION_ATTRIBUTE = 'position';
const NORMAL_ATTRIBUTE = 'normal';
const REVERSED_ORIENTATION = '-';

const EDGE_LINE_COLOR = 0xffffff;
const VERTEX_MARKER_SEGMENTS = 12;
const VERTEX_MARKER_COLOR = 0xffff00;
const VERTEX_KEY_PRECISION = 6;
const VERTEX_RADIUS_SCALE = 0.05;
const MESH_SHININESS = 30;
const POLYGON_OFFSET_FACTOR = 1;
const POLYGON_OFFSET_UNITS = 1;

export const SOLID_COLORS = [
  0x3388ff, 0xff8833, 0x33ff88, 0xff3388, 0x8833ff,
  0x33ffff, 0xffff33, 0xff33ff, 0x88ff33, 0x3388aa,
];

export function buildMaps(data) {
  const pointMap = mapFeaturesById(data.points, pf =>
    (pf.place || pf.geometry).coordinates.slice()
  );
  centerCoordinatesAroundOrigin(Object.values(pointMap));
  return {
    pointMap,
    edgeMap: mapFeaturesById(data.edges, ef => ef.topology.references),
    ringMap:  mapFeaturesById(data.rings),
    faceMap:  mapFeaturesById(data.faces),
    shellMap: mapFeaturesById(data.shells),
  };
}

function mapFeaturesById(featureCollections = [], getValue = f => f) {
  const map = {};
  featureCollections.forEach(fc => fc.features.forEach(f => { map[f.id] = getValue(f); }));
  return map;
}

function centerCoordinatesAroundOrigin(coords) {
  if (!coords.length) return;
  const centroid = calculateCentroid(coords);
  coords.forEach(c => c.forEach((v, i) => { c[i] = v - centroid[i]; }));
}

function calculateCentroid(coords) {
  const totals = coords.reduce(
    (sums, c) => { c.forEach((v, i) => { sums[i] += v; }); return sums; },
    Array(COORDINATE_DIMENSIONS).fill(0)
  );
  return totals.map(t => t / coords.length);
}

export function getFeatures(featureCollections = []) {
  return featureCollections.flatMap(fc => fc.features);
}

export function getTopologyFeatureCounts(data) {
  const countFeatures = (fcs = []) => fcs.reduce((n, fc) => n + fc.features.length, 0);
  return {
    points: countFeatures(data.points),
    edges:  countFeatures(data.edges),
    faces:  countFeatures(data.faces),
    shells: countFeatures(data.shells),
  };
}

export function needsTransparency(data) {
  const faceHasHole = getFeatures(data.faces || [])
    .some(face => face.topology.directed_references.length > 1);
  const solidHasVoid = getFeatures(data.solids || [])
    .some(solid => solid.topology.shells.length > 1);
  return faceHasHole || solidHasVoid;
}

function ringToCoords(ringFeature, edgeMap, pointMap) {
  return ringFeature.topology.directed_references.map(member => {
    const [startId, endId] = edgeMap[member.ref];
    return pointMap[member.orientation === '+' ? startId : endId];
  });
}

function createPlaneBasis(normal) {
  const n = new THREE.Vector3(...normal).normalize();
  const ref = Math.abs(n.x) < NORMAL_X_AXIS_THRESHOLD
    ? new THREE.Vector3(1, 0, 0)
    : new THREE.Vector3(0, 1, 0);
  const u = new THREE.Vector3().crossVectors(ref, n).normalize();
  return { axisU: u, axisV: new THREE.Vector3().crossVectors(n, u) };
}

function triangulatePolygon(outerCoords, holeCoordsList, normal) {
  const positions = [];
  const normals = [];
  if (outerCoords.length < 3) return { positions, normals };

  const { axisU, axisV } = createPlaneBasis(normal);
  const origin = new THREE.Vector3(...outerCoords[0]);
  const projectPoint = coord => {
    const rel = new THREE.Vector3(...coord).sub(origin);
    return [rel.dot(axisU), rel.dot(axisV)];
  };

  const allCoords3D = [...outerCoords];
  const flat2D = outerCoords.flatMap(projectPoint);
  const holeIndices = [];
  for (const holeCoords of holeCoordsList) {
    if (holeCoords.length < 3) continue;
    holeIndices.push(allCoords3D.length);
    allCoords3D.push(...holeCoords);
    flat2D.push(...holeCoords.flatMap(projectPoint));
  }

  const indices = earcut(flat2D, holeIndices.length ? holeIndices : null);
  for (let i = 0; i < indices.length; i += 3) {
    positions.push(...allCoords3D[indices[i]], ...allCoords3D[indices[i + 1]], ...allCoords3D[indices[i + 2]]);
    normals.push(...normal, ...normal, ...normal);
  }
  return { positions, normals };
}

function collectUniqueSolidEdgeIds(solid, shellMap, faceMap, ringMap) {
  const edgeIds = new Set();
  solid.topology.shells.forEach(shellRef => {
    shellMap[shellRef.ref]?.topology.directed_references.forEach(faceRef => {
      faceMap[faceRef.ref]?.topology.directed_references.forEach(ringRef => {
        ringMap[ringRef.ref]?.topology.directed_references.forEach(edgeRef => edgeIds.add(edgeRef.ref));
      });
    });
  });
  return edgeIds;
}

export function buildSolidEdgeLines(solid, shellMap, faceMap, ringMap, edgeMap, pointMap) {
  const positions = [];
  collectUniqueSolidEdgeIds(solid, shellMap, faceMap, ringMap).forEach(id => {
    const pts = edgeMap[id];
    if (pts && pointMap[pts[0]] && pointMap[pts[1]])
      positions.push(...pointMap[pts[0]], ...pointMap[pts[1]]);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(POSITION_ATTRIBUTE, new THREE.BufferAttribute(new Float32Array(positions), COORDINATE_DIMENSIONS));
  return new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: EDGE_LINE_COLOR }));
}

export function buildSolidGeometry(solid, shellMap, faceMap, ringMap, edgeMap, pointMap) {
  const vertexPositions = [];
  const vertexNormals = [];
  let faceCount = 0;
  for (const shellRef of solid.topology.shells) {
    const shell = shellMap[shellRef.ref];
    if (!shell) continue;
    for (const faceRef of shell.topology.directed_references) {
      const face = faceMap[faceRef.ref];
      if (!face) continue;
      const rawNormal = face.properties.normal;
      const normal = faceRef.orientation === REVERSED_ORIENTATION
        ? [-rawNormal[0], -rawNormal[1], -rawNormal[2]]
        : rawNormal;
      const ringRefs = face.topology.directed_references;
      const outerRing = ringMap[ringRefs[0]?.ref];
      if (!outerRing) continue;
      const outerCoords = ringToCoords(outerRing, edgeMap, pointMap);
      if (outerCoords.length < 3) continue;
      const holeCoordsList = ringRefs.slice(1)
        .map(r => ringMap[r.ref])
        .filter(r => r != null)
        .map(r => ringToCoords(r, edgeMap, pointMap))
        .filter(c => c.length >= 3);
      const tri = triangulatePolygon(outerCoords, holeCoordsList, normal);
      vertexPositions.push(...tri.positions);
      vertexNormals.push(...tri.normals);
      faceCount++;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(POSITION_ATTRIBUTE, new THREE.BufferAttribute(new Float32Array(vertexPositions), COORDINATE_DIMENSIONS));
  geometry.setAttribute(NORMAL_ATTRIBUTE, new THREE.BufferAttribute(new Float32Array(vertexNormals), COORDINATE_DIMENSIONS));
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return { geometry, faceCount };
}

export function createSolidMesh(solid, index, geometry, opacity = 1.0) {
  const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
    color: SOLID_COLORS[index % SOLID_COLORS.length],
    side: THREE.DoubleSide,
    shininess: MESH_SHININESS,
    transparent: opacity < 1.0,
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: POLYGON_OFFSET_FACTOR,
    polygonOffsetUnits: POLYGON_OFFSET_UNITS,
  }));
  mesh.userData.solidName = solid.properties?.name || solid.id;
  return mesh;
}

export function createVertexMarkers(geometry) {
  const r = geometry.boundingSphere.radius * VERTEX_RADIUS_SCALE;
  const markerGeo = new THREE.SphereGeometry(r, VERTEX_MARKER_SEGMENTS, VERTEX_MARKER_SEGMENTS);
  const markerMat = new THREE.MeshBasicMaterial({ color: VERTEX_MARKER_COLOR });
  const group = new THREE.Group();
  const pos = geometry.getAttribute(POSITION_ATTRIBUTE);
  const seen = new Set();
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(VERTEX_KEY_PRECISION)},${pos.getY(i).toFixed(VERTEX_KEY_PRECISION)},${pos.getZ(i).toFixed(VERTEX_KEY_PRECISION)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    group.add(marker);
  }
  return group;
}