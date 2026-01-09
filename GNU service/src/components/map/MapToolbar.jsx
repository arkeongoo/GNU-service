// src/components/map/MapToolbar.jsx
import { useMapUiStore } from "../../store/mapUiStore";

export default function MapToolbar({
  visibleCount,
  totalCount,
  pickMode,
  start,
  end,
  onPickStart,
  onPickEnd,
  onReset,
}) {
  const showCctv = useMapUiStore((s) => s.showCctv);
  const toggleCctv = useMapUiStore((s) => s.toggleCctv);

  const btnBase =
    "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold transition focus:outline-none focus:ring-4";
  const btnPrimary =
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100";
  const btnOutline =
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-100";
  const btnActive =
    "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50 focus:ring-blue-100";

  return (
    <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            학교 주변 CCTV(더미)
          </div>
          <div className="mt-0.5 text-xs text-slate-600">
            현재 화면 내: <span className="font-semibold">{visibleCount}</span> / 전체{" "}
            <span className="font-semibold">{totalCount}</span>
          </div>

          {(start || end) && (
            <div className="mt-1 text-[11px] text-slate-500">
              출발지: {start ? "설정됨" : "미설정"} · 도착지:{" "}
              {end ? "설정됨" : "미설정"}
            </div>
          )}

          {start && end && (
            <div className="mt-0.5 text-[11px] font-medium text-blue-600">
              CCTV를 경유한 안전 경로가 생성되었습니다
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            type="button"
            onClick={toggleCctv}
            className={[btnBase, showCctv ? btnPrimary : btnOutline].join(" ")}
          >
            {showCctv ? "CCTV 끄기" : "CCTV 켜기"}
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPickStart}
          className={[
            btnBase,
            pickMode === "start" ? btnActive : btnOutline,
          ].join(" ")}
        >
          출발지 설정{pickMode === "start" ? " (지도 클릭)" : ""}
        </button>

        <button
          type="button"
          onClick={onPickEnd}
          className={[
            btnBase,
            pickMode === "end" ? btnActive : btnOutline,
          ].join(" ")}
        >
          도착지 설정{pickMode === "end" ? " (지도 클릭)" : ""}
        </button>

        <button
          type="button"
          onClick={onReset}
          className={[btnBase, btnOutline].join(" ")}
        >
          초기화
        </button>

        {pickMode && (
          <span className="ml-1 text-xs font-medium text-slate-600">
            지도에서 위치를 클릭하세요
          </span>
        )}
      </div>
    </div>
  );
}
