import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-sm text-slate-600">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
      >
        홈으로
      </Link>
    </div>
  );
}
