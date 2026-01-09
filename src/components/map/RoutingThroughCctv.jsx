// src/components/map/RoutingThroughCctv.jsx  (새 파일)
// 출발/도착이 정해지면 "가장 적당한 CCTV 1개"를 경유지로 삼아 OSRM으로 경로를 받아 그려줌
import { useEffect, useMemo, useState } from "react";
import { Polyline } from "react-leaflet";

// OSRM 공개 데모 서버 사용(프로토타입 용)
const OSRM_ROUTE_URL = "https://router.project-osrm.org/route/v1/foot";

// 거리(대략, 위경도) - 진주 캠퍼스 근방 프로토타입용으로 충분
function dist2(a, b) {
  const dx = a.lng - b.lng;
  const dy = a.lat - b.lat;
  return dx * dx + dy * dy;
}

function midpoint(a, b) {
  return { lat: (a.lat + b.lat) / 2, lng: (a.lng + b.lng) / 2 };
}

// CCTV 후보 선정: (1) start-end 중간점에 가까운 CCTV 우선
function pickBestCctv(start, end, cctvPoints) {
  if (!cctvPoints?.length) return null;
  const mid = midpoint(start, end);

  let best = null;
  let bestScore = Infinity;

  for (const p of cctvPoints) {
    const c = { lat: p.lat, lng: p.lon };
    // 중간점과 가까울수록 점수 낮음 + 출발/도착에서 너무 멀면 불리하게
    const score = dist2(mid, c) * 2 + dist2(start, c) + dist2(end, c);
    if (score < bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best;
}

async function fetchRouteGeoJSON(coordsLngLat) {
  const coordStr = coordsLngLat.map((c) => `${c.lng},${c.lat}`).join(";");
  const url =
    `${OSRM_ROUTE_URL}/${coordStr}` +
    `?overview=full&geometries=geojson&alternatives=false&steps=false`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("OSRM route request failed");
  const data = await res.json();
  const geom = data?.routes?.[0]?.geometry;
  if (!geom?.coordinates?.length) throw new Error("No route geometry");
  // OSRM geojson: [lng, lat] -> leaflet: [lat, lng]
  return geom.coordinates.map(([lng, lat]) => [lat, lng]);
}

export default function RoutingThroughCctv({ start, end, cctvPoints }) {
  const [path, setPath] = useState(null);
  const [via, setVia] = useState(null);

  const bestCctv = useMemo(
    () => pickBestCctv(start, end, cctvPoints),
    [start, end, cctvPoints]
  );

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        if (!start || !end || !bestCctv) {
          setPath(null);
          setVia(null);
          return;
        }

        const viaPoint = { lat: bestCctv.lat, lng: bestCctv.lon };
        setVia(bestCctv);

        const line = await fetchRouteGeoJSON([start, viaPoint, end]);
        if (!alive) return;
        setPath(line);
      } catch {
        if (!alive) return;
        setPath(null);
        setVia(null);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [start, end, bestCctv]);

  if (!path) return null;

  return (
    <>
      {/* 경로 라인 (기본 스타일로 충분히 구분됨) */}
      <Polyline positions={path} weight={6} opacity={0.9} />

      {/* 필요하면 via 정보 UI를 다른 곳에 표시해도 됨 */}
      {/* via는 MapPage/Toolbar에 표시하고 싶으면 via 상태를 위로 올리면 됨 */}
    </>
  );
}
