// src/shared/lib/geo.js
export function inBounds(lat, lon, bounds) {
  // bounds: Leaflet LatLngBounds
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  return lat >= sw.lat && lat <= ne.lat && lon >= sw.lng && lon <= ne.lng;
}
