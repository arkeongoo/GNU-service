// src/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">안심 귀가 서비스</div>
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Safe Route Prototype
          </div>
        </div>
      </div>
    </footer>
  );
}
