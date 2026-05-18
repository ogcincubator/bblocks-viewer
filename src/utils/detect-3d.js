export function isTopoFeatureMultiCollection(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const topoKeys = ['points', 'edges', 'rings', 'faces', 'shells', 'solids'];
  return topoKeys.some(k =>
    Array.isArray(data[k]) && data[k].some(fc => Array.isArray(fc?.features))
  );
}

function _coordsHave3D(coords) {
  if (!Array.isArray(coords) || !coords.length) return false;
  if (typeof coords[0] === 'number') return coords.length >= 3;
  return coords.some(_coordsHave3D);
}

function _geometryHas3D(geometry) {
  if (!geometry?.type || !geometry.coordinates) return false;
  return _coordsHave3D(geometry.coordinates);
}

export function isGeoJson3D(data) {
  if (!data || typeof data !== 'object') return false;
  if (data.type === 'Feature') return !!data.geometry && _geometryHas3D(data.geometry);
  if (data.type === 'FeatureCollection') {
    return Array.isArray(data.features) &&
      data.features.some(f => f?.geometry && _geometryHas3D(f.geometry));
  }
  if (data.type === 'GeometryCollection') {
    return Array.isArray(data.geometries) && data.geometries.some(_geometryHas3D);
  }
  if (data.coordinates) return _geometryHas3D(data);
  return false;
}

export function hasAny3DContent(data) {
  return isTopoFeatureMultiCollection(data) || isGeoJson3D(data);
}