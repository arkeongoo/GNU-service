// src/components/map/CctvLayer.jsx  (기존 파일 수정 - icon 적용)
import { Marker, Popup } from "react-leaflet";
import { cctvIcon } from "./markers";

export default function CctvLayer({ points }) {
  return (
    <>
      {points.map((p) => (
        <Marker
          key={p.id ?? `${p.lat}-${p.lon}`}
          position={[p.lat, p.lon]}
          icon={cctvIcon}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">CCTV</div>
              <div className="text-slate-600">
                {p.name ?? "안심 CCTV(더미)"}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
