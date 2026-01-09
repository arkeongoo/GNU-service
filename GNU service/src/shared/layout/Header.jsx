// src/layout/Header.jsx
import { Link, NavLink, useLocation } from "react-router-dom";

const navClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-blue-600 text-white shadow-sm"
      : "text-slate-700 hover:bg-slate-100",
  ].join(" ");

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
        <img
  src="/GNU.png"
  alt="안심 귀가길 로고"
  className="h-9 w-9 rounded-xl object-contain shadow-sm"
/>

          <span className="text-sm font-semibold tracking-tight text-slate-900">
            안심 귀가 서비스
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClass}>
            홈
          </NavLink>
          <NavLink to="/map" className={navClass}>
            지도
          </NavLink>
        </nav>
{/* 우측 보조 액션 */}
<div className="hidden sm:block">
  <Link
    to="/complaints"
    className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
  >
    민원 접수
  </Link>
</div>

      </div>
    </header>
  );
}
