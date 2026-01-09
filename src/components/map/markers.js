// src/components/map/markers.js  (새 파일)
import L from "leaflet";

function pinSvg({ fill, stroke = "#0f172a" }) {
  // 간단한 핀 SVG(색만 바꿈) - data URI로 아이콘 사용
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
    <path d="M18 43s14-12.2 14-25A14 14 0 1 0 4 18c0 12.8 14 25 14 25Z"
      fill="${fill}" stroke="${stroke}" stroke-width="2" />
    <circle cx="18" cy="18" r="6" fill="#ffffff" opacity="0.95"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const startIcon = new L.Icon({
  iconUrl: pinSvg({ fill: "#22c55e" }), // green
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -40],
});

export const endIcon = new L.Icon({
  iconUrl: pinSvg({ fill: "#ef4444" }), // red
  iconSize: [36, 44],
  iconAnchor: [18, 44],
  popupAnchor: [0, -40],
});

export const cctvIcon = new L.Icon({
  iconUrl: pinSvg({ fill: "#2563eb" }), // blue
  iconSize: [30, 38],
  iconAnchor: [15, 38],
  popupAnchor: [0, -34],
});
