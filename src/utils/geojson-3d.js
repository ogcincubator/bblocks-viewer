import * as THREE from 'three';
import earcut from 'earcut';

const POSITION_ATTRIBUTE = 'position';
const COORDINATE_DIMENSIONS = 3;
const MESH_SHININESS = 30;
const POLYGON_OFFSET_FACTOR = 1;
const POLYGON_OFFSET_UNITS = 1;
const POINT_MARKER_SEGMENTS = 8;
const POINT_RADIUS_SCALE = 0.02;
const LINE_COLOR = 0xffffff;

const FEATURE_COLORS = [
  0x3388ff, 0xff8833, 0x33ff88, 0xff3388, 0x8833ff,
  0x33ffff, 0xffff33, 0xff33ff, 0x88ff33, 0x3388aa,
];

// ─── Coordinate gathering ─────────────────────────────────────────────────────

function gatherPositions(data, out) {
  if (!data || typeof data !== 'object') return;
  switch (data.type) {
    case 'Feature':
      gatherPositions(data.geometry, out);
      break;
    case 'FeatureCollection':
      data.features?.forEach(f => gatherPositions(f, out));
      break;
    case 'GeometryCollection':
      data.geometries?.forEach(g => gatherPositions(g, out));
      break;
    case 'Point':
      out.push(coordTo3D(data.coordinates));
      break;
    case 'MultiPoint':
    case 'LineString':
      data.coordinates?.forEach(c => out.push(coordTo3D(c)));
      break;
    case 'MultiLineString':
    case 'Polygon':
      data.coordinates?.forEach(ring => ring.forEach(c => out.push(coordTo3D(c))));
      break;
    case 'MultiPolygon':
      data.coordinates?.forEach(poly => poly.forEach(ring => ring.forEach(c => out.push(coordTo3D(c)))));
      break;
  }
}

function coordTo3D(c) {
  return [c[0], c[1], c[2] ?? 0];
}

function computeCentroid(positions) {
  const sum = [0, 0, 0];
  positions.forEach(p => { sum[0] += p[0]; sum[1] += p[1]; sum[2] += p[2]; });
  return sum.map(s => s / positions.length);
}

// GeoJSON rings are closed (last vertex === first). Strip the closing vertex
// so earcut receives an open ring.
function openRing(ring) {
  if (ring.length < 2) return ring;
  const first = ring[0], last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1] && first[2] === last[2]) {
    return ring.slice(0, -1);
  }
  return ring;
}

// ─── Geographic projection ────────────────────────────────────────────────────

function isGeographicCoords(positions) {
  return positions.every(p => p[0] >= -180 && p[0] <= 180 && p[1] >= -90 && p[1] <= 90);
}

// Equirectangular projection: converts lon/lat/alt to metres relative to centroid.
function makeGeographicProjection(centroid) {
  const lat0 = centroid[1] * Math.PI / 180;
  const metersPerDegLon = 111320 * Math.cos(lat0);
  const metersPerDegLat = 111320;
  return c => [
    (c[0] - centroid[0]) * metersPerDegLon,
    (c[1] - centroid[1]) * metersPerDegLat,
    c[2] - centroid[2],
  ];
}

function makeCartesianProjection(centroid) {
  return c => [c[0] - centroid[0], c[1] - centroid[1], c[2] - centroid[2]];
}

// ─── Geometry builders ────────────────────────────────────────────────────────

function computePolygonNormal(ring) {
  // Newell's method
  let nx = 0, ny = 0, nz = 0;
  for (let i = 0; i < ring.length; i++) {
    const curr = ring[i];
    const next = ring[(i + 1) % ring.length];
    nx += (curr[1] - next[1]) * (curr[2] + next[2]);
    ny += (curr[2] - next[2]) * (curr[0] + next[0]);
    nz += (curr[0] - next[0]) * (curr[1] + next[1]);
  }
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  return len > 0 ? [nx / len, ny / len, nz / len] : [0, 0, 1];
}

function createPlaneBasis(normal) {
  const n = new THREE.Vector3(...normal).normalize();
  const ref = Math.abs(n.x) < 0.9
    ? new THREE.Vector3(1, 0, 0)
    : new THREE.Vector3(0, 1, 0);
  const u = new THREE.Vector3().crossVectors(ref, n).normalize();
  return { axisU: u, axisV: new THREE.Vector3().crossVectors(n, u) };
}

function buildPolygonMesh(rings, color) {
  // Strip GeoJSON closing vertices before triangulating
  const openRings = rings.map(openRing).filter(r => r.length >= 3);
  if (!openRings.length) return null;

  const normal = computePolygonNormal(openRings[0]);
  const { axisU, axisV } = createPlaneBasis(normal);
  const origin = new THREE.Vector3(...openRings[0][0]);

  const allCoords3D = openRings.flatMap(r => r);
  const flat2D = [];
  const holeIndices = [];
  let offset = 0;

  openRings.forEach((ring, i) => {
    if (i > 0) holeIndices.push(offset);
    ring.forEach(c => {
      const rel = new THREE.Vector3(...c).sub(origin);
      flat2D.push(rel.dot(axisU), rel.dot(axisV));
    });
    offset += ring.length;
  });

  const indices = earcut(flat2D, holeIndices.length ? holeIndices : null);
  if (!indices.length) return null;

  const positions = [];
  const normals = [];
  for (let i = 0; i < indices.length; i += 3) {
    positions.push(...allCoords3D[indices[i]], ...allCoords3D[indices[i + 1]], ...allCoords3D[indices[i + 2]]);
    normals.push(...normal, ...normal, ...normal);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(POSITION_ATTRIBUTE, new THREE.BufferAttribute(new Float32Array(positions), COORDINATE_DIMENSIONS));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), COORDINATE_DIMENSIONS));

  return new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
    color,
    side: THREE.DoubleSide,
    shininess: MESH_SHININESS,
    polygonOffset: true,
    polygonOffsetFactor: POLYGON_OFFSET_FACTOR,
    polygonOffsetUnits: POLYGON_OFFSET_UNITS,
  }));
}

function buildLineMesh(coords) {
  const positions = coords.flatMap(c => c);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(POSITION_ATTRIBUTE, new THREE.BufferAttribute(new Float32Array(positions), COORDINATE_DIMENSIONS));
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: LINE_COLOR }));
}

function buildPointMarker(coord, radius) {
  const geo = new THREE.SphereGeometry(radius, POINT_MARKER_SEGMENTS, POINT_MARKER_SEGMENTS);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const marker = new THREE.Mesh(geo, mat);
  marker.position.set(...coord);
  return marker;
}

// ─── Scene assembly ───────────────────────────────────────────────────────────

function processGeometry(geometry, project, colorIndex, radius, out) {
  if (!geometry) return;
  const color = FEATURE_COLORS[colorIndex % FEATURE_COLORS.length];
  const p = c => project(coordTo3D(c));

  switch (geometry.type) {
    case 'Point': {
      const marker = buildPointMarker(p(geometry.coordinates), radius);
      out.points.push(marker);
      out.objects.push(marker);
      break;
    }
    case 'MultiPoint':
      geometry.coordinates.forEach(c => {
        const marker = buildPointMarker(p(c), radius);
        out.points.push(marker);
        out.objects.push(marker);
      });
      break;
    case 'LineString': {
      const line = buildLineMesh(geometry.coordinates.map(p));
      out.lines.push(line);
      out.objects.push(line);
      break;
    }
    case 'MultiLineString':
      geometry.coordinates.forEach(coords => {
        const line = buildLineMesh(coords.map(p));
        out.lines.push(line);
        out.objects.push(line);
      });
      break;
    case 'Polygon': {
      const mesh = buildPolygonMesh(geometry.coordinates.map(ring => ring.map(p)), color);
      if (mesh) { out.meshes.push(mesh); out.objects.push(mesh); }
      break;
    }
    case 'MultiPolygon':
      geometry.coordinates.forEach(poly => {
        const mesh = buildPolygonMesh(poly.map(ring => ring.map(p)), color);
        if (mesh) { out.meshes.push(mesh); out.objects.push(mesh); }
      });
      break;
    case 'GeometryCollection':
      geometry.geometries?.forEach((g, i) => processGeometry(g, project, colorIndex + i, radius, out));
      break;
  }
}

export function buildGeoJson3DObjects(data) {
  const allPositions = [];
  gatherPositions(data, allPositions);
  if (!allPositions.length) return { objects: [], meshes: [], lines: [], points: [] };

  const centroid = computeCentroid(allPositions);
  const project = isGeographicCoords(allPositions)
    ? makeGeographicProjection(centroid)
    : makeCartesianProjection(centroid);

  // Estimate point radius from projected bounding box
  const projected = allPositions.map(project);
  const xs = projected.map(p => p[0]);
  const ys = projected.map(p => p[1]);
  const zs = projected.map(p => p[2]);
  const extent = Math.max(
    Math.max(...xs) - Math.min(...xs),
    Math.max(...ys) - Math.min(...ys),
    Math.max(...zs) - Math.min(...zs),
    1e-6
  );
  const radius = extent * POINT_RADIUS_SCALE;

  const out = { objects: [], meshes: [], lines: [], points: [] };

  if (data.type === 'FeatureCollection') {
    data.features?.forEach((f, i) => processGeometry(f.geometry, project, i, radius, out));
  } else if (data.type === 'Feature') {
    processGeometry(data.geometry, project, 0, radius, out);
  } else {
    processGeometry(data, project, 0, radius, out);
  }

  return out;
}