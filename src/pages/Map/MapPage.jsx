// src/pages/Map/MapPage.jsx  (수정본: 출발/도착 마커 아이콘 변경 + CCTV 경유 경로 표시)
import { useCallback, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { CCTV_DUMMY, CAMPUS_CENTER } from "../../data/cctvDummy";
import { useMapUiStore } from "../../store/mapUiStore";
import { inBounds } from "../../shared/lib/geo";

import MapToolbar from "../../components/map/MapToolbar";
import MapEvents from "../../components/map/MapEvents";
import CctvLayer from "../../components/map/CctvLayer";
import RoutingThroughCctv from "../../components/map/RoutingThroughCctv";

import { startIcon, endIcon } from "../../components/map/markers";

export default function MapPage() {
  const showCctv = useMapUiStore((s) => s.showCctv);
  const [bounds, setBounds] = useState(null);

  const [pickMode, setPickMode] = useState(null); // "start" | "end" | null
  const [start, setStart] = useState(null); // { lat, lng }
  const [end, setEnd] = useState(null); // { lat, lng }

  const onBoundsChange = useCallback((b) => setBounds(b), []);

  const onMapClick = useCallback(
    (latlng) => {
      if (!pickMode) return;

      if (pickMode === "start") setStart({ lat: latlng.lat, lng: latlng.lng });
      if (pickMode === "end") setEnd({ lat: latlng.lat, lng: latlng.lng });

      setPickMode(null);
    },
    [pickMode]
  );

  const resetRoute = useCallback(() => {
    setPickMode(null);
    setStart(null);
    setEnd(null);
  }, []);

  const visibleCctvCount = useMemo(() => {
    if (!bounds) return 0;
    return CCTV_DUMMY.filter((p) => inBounds(p.lat, p.lon, bounds)).length;
  }, [bounds]);

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-white">
      <div className="mx-auto h-full w-full max-w-6xl px-4 py-4">
        <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-[500] flex justify-center p-3">
            <MapToolbar
              visibleCount={visibleCctvCount}
              totalCount={CCTV_DUMMY.length}
              pickMode={pickMode}
              start={start}
              end={end}
              onPickStart={() => setPickMode("start")}
              onPickEnd={() => setPickMode("end")}
              onReset={resetRoute}
            />
          </div>

          <MapContainer
            center={CAMPUS_CENTER}
            zoom={16}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEvents onBoundsChange={onBoundsChange} onClickLatLng={onMapClick} />

            {/* 출발/도착 마커(색/디자인 구분) */}
            {start && (
              <Marker position={[start.lat, start.lng]} icon={startIcon}>
                <Popup>출발지</Popup>
              </Marker>
            )}
            {end && (
              <Marker position={[end.lat, end.lng]} icon={endIcon}>
                <Popup>도착지</Popup>
              </Marker>
            )}

            {/* 출발/도착 설정되면 CCTV 경유 경로 표시 */}
            {start && end && (
              <RoutingThroughCctv start={start} end={end} cctvPoints={CCTV_DUMMY} />
            )}

            {showCctv && <CctvLayer points={CCTV_DUMMY} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
