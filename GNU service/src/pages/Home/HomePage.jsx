// src/pages/Home/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              여성 안전 귀가 지원 서비스
            </p>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              여성 안심 귀갓길
            </h1>

            <p className="mt-5 text-pretty text-base leading-7 text-slate-600 md:text-lg">
              귀갓길 주변의 CCTV와 안전 요소를 기반으로,
              <br className="hidden sm:block" />
              보다 안심할 수 있는 이동 경로를 안내합니다.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/map"
                className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                지도에서 확인하기
              </Link>

              <a
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                서비스 기능
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              현재 일부 기능은 순차적으로 확대 적용되고 있습니다.
            </p>
          </div>

          {/* Preview 카드 */}
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 shadow-sm md:p-10">
              <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                  title="지도 기반 안내"
                  desc="귀갓길 주변 환경을 지도에서 직관적으로 확인할 수 있습니다."
                />
                <InfoCard
                  title="CCTV 위치 확인"
                  desc="이동 경로 인근의 CCTV 위치를 한눈에 파악할 수 있습니다."
                />
                <InfoCard
                  title="안전 요소 반영"
                  desc="야간 보행 시 안심할 수 있도록 안전 요소를 고려합니다."
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      안전한 귀가를 위한 첫걸음
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      현재 위치 기준으로 주변 안전 정보를 확인해보세요.
                    </div>
                  </div>
                  <Link
                    to="/map"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  >
                    지도 열기
                  </Link>
                </div>
              </div>

              {/* Decorative */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-100 blur-3xl" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                주요 기능
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                귀갓길 안전을 위해 필요한 핵심 기능을 제공합니다.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Feature
                title="안전 요소 표시"
                desc="귀갓길 주변의 CCTV 등 주요 안전 요소를 지도에 표시합니다."
              />
              <Feature
                title="현재 위치 기반"
                desc="사용자의 현재 위치를 기준으로 주변 정보를 제공합니다."
              />
              <Feature
                title="경로 안내"
                desc="보다 안심할 수 있는 이동 경로를 안내합니다."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{desc}</div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{desc}</div>
      <div className="mt-4 h-1 w-10 rounded-full bg-blue-600" />
    </div>
  );
}
