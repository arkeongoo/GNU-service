// src/pages/Complaints/ComplaintsPage.jsx
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "complaints:v1";

function loadComplaints() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveComplaints(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function formatDate(ts) {
  const d = new Date(ts);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

const CATEGORY_OPTIONS = ["안전", "조명", "CCTV", "시설", "기타"];

export default function ComplaintsPage() {
  const [items, setItems] = useState(() => loadComplaints());

  // customer form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("안전");
  const [locationText, setLocationText] = useState("");

  // list state
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    saveComplaints(items);
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      return (
        it.title.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q) ||
        (it.locationText || "").toLowerCase().includes(q)
      );
    });
  }, [items, query]);

  const activeItem = useMemo(
    () => filtered.find((x) => x.id === activeId) || null,
    [filtered, activeId]
  );

  function resetForm() {
    setTitle("");
    setContent("");
    setLocationText("");
    setCategory("안전");
  }

  function onSubmit(e) {
    e.preventDefault();

    const t = title.trim();
    const c = content.trim();
    if (!t || !c) return;

    const now = Date.now();
    const newItem = {
      id: `c-${now}`,
      title: t,
      content: c,
      category,
      locationText: locationText.trim(),
      // 고객 화면에서는 상태는 "읽기 전용"으로만 표시 (기본값)
      status: "접수",
      createdAt: now,
    };

    setItems((prev) => [newItem, ...prev]);
    setActiveId(newItem.id);
    resetForm();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            문의/민원 접수
          </h1>
          <p className="text-sm text-slate-600">
            안전 관련 문의를 등록하고 처리 상태를 확인할 수 있습니다.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left: List + Detail */}
          <section className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* List toolbar */}
              <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  내 문의 내역
                </div>

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="검색(제목/내용/위치)"
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-4 focus:ring-slate-100 sm:w-64"
                />
              </div>

              <div className="grid lg:grid-cols-2">
                {/* List */}
                <div className="max-h-[540px] overflow-auto lg:border-r lg:border-slate-200">
                  {filtered.length === 0 ? (
                    <div className="p-5 text-sm text-slate-600">
                      아직 등록된 문의가 없습니다.
                    </div>
                  ) : (
                    filtered.map((it) => (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => setActiveId(it.id)}
                        className={[
                          "w-full text-left px-5 py-4 border-b border-slate-200 last:border-b-0 transition",
                          "hover:bg-slate-50",
                          activeId === it.id ? "bg-slate-50" : "bg-white",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <CategoryChip category={it.category} />
                              <div className="min-w-0 text-sm font-semibold text-slate-900 line-clamp-1">
                                {it.title}
                              </div>
                            </div>

                            <div className="mt-1 text-xs text-slate-500">
                              {formatDate(it.createdAt)}
                              {it.locationText ? ` · ${it.locationText}` : ""}
                            </div>
                          </div>

                          <StatusBadge status={it.status} />
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Detail (read-only) */}
                <div className="p-5">
                  {!activeItem ? (
                    <EmptyDetail />
                  ) : (
                    <DetailReadOnly item={activeItem} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Right: Compose */}
          <section className="lg:col-span-5">
            <div className="lg:sticky lg:top-20">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">
                    문의 등록
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    초기화
                  </button>
                </div>

                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="분류">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-slate-100"
                      >
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="위치(선택)">
                      <input
                        value={locationText}
                        onChange={(e) => setLocationText(e.target.value)}
                        placeholder="예) 도서관 뒤편"
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-4 focus:ring-slate-100"
                      />
                    </Field>
                  </div>

                  <Field label="제목">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="예) 후문 쪽 조명이 어두워요"
                      className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-4 focus:ring-slate-100"
                    />
                  </Field>

                  <Field label="내용">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="상세 내용을 작성해주세요."
                      rows={7}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm leading-7 outline-none focus:ring-4 focus:ring-slate-100"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={!title.trim() || !content.trim()}
                    className={[
                      "inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-4",
                      title.trim() && content.trim()
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed focus:ring-slate-100",
                    ].join(" ")}
                  >
                    등록하기
                  </button>

                  <p className="text-xs text-slate-500">
                    등록 후에는 수정/삭제할 수 없습니다.
                  </p>
                </form>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">
                  안내
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  <li>위치를 함께 적으면 확인이 빨라집니다.</li>
                  <li>야간/우천 등 상황을 함께 적어주세요.</li>
                  <li>처리 상태는 “접수 → 확인중 → 처리중 → 완료”로 표시됩니다.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI pieces ---------- */

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-700">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 p-6">
      <div className="text-sm font-semibold text-slate-900">상세 보기</div>
      <p className="mt-2 text-sm text-slate-600">
        왼쪽 목록에서 항목을 선택하면 내용을 확인할 수 있습니다.
      </p>
    </div>
  );
}

function DetailReadOnly({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <CategoryChip category={item.category} />
            <div className="min-w-0 text-base font-semibold text-slate-900">
              {item.title}
            </div>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {formatDate(item.createdAt)}
          </div>

          {item.locationText ? (
            <div className="mt-2 text-sm text-slate-700">
              <span className="font-medium">위치:</span> {item.locationText}
            </div>
          ) : null}
        </div>

        <StatusBadge status={item.status} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm leading-7 text-slate-700 whitespace-pre-wrap">
        {item.content}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        상태 변경/삭제는 운영자가 처리합니다.
      </p>
    </div>
  );
}

function CategoryChip({ category }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
      {category}
    </span>
  );
}

function StatusBadge({ status }) {
  const cls =
    status === "완료"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "처리중"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : status === "확인중"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}
