function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export default function PageNav({
  page = 1,
  totalPages = 1,
  onChange,
  siblingCount = 1, // 현재 페이지 양 옆에 보여줄 수(기본 1)
  showEdges = true, // 처음,끝 버튼 노출 여부(기본 true)
  className = "",
}) {
  if (totalPages < 1) totalPages = 1;
  const clampedPage = Math.min(Math.max(1, page), totalPages);

  const left = Math.max(1, clampedPage - siblingCount);
  const right = Math.min(totalPages, clampedPage + siblingCount);

  const pages = [];
  if (left > 1) pages.push(1);
  if (left > 2) pages.push("left-ellipsis");
  pages.push(...range(left, right));
  if (right < totalPages - 1) pages.push("right-ellipsis");
  if (right < totalPages) pages.push(totalPages);

  const goto = (p) => {
    if (!onChange) return;
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== clampedPage) onChange(next);
  };

  const btn =
    "min-w-9 h-9 px-3 inline-flex items-center justify-center rounded border text-sm select-none";
  const muted = "text-stone-500 border-stone-200";
  const active = "bg-black text-white border-black";
  const normal =
    "hover:bg-stone-100 border-stone-300 focus:outline-none focus:ring-2 focus:ring-black/30";

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      role="navigation"
      aria-label="Pagination"
    >
      {showEdges && (
        <button
          type="button"
          className={`${btn} ${normal} ${
            clampedPage === 1 ? "opacity-40 cursor-not-allowed" : ""
          }`}
          onClick={() => goto(1)}
          disabled={clampedPage === 1}
          aria-label="First page"
        >
          «
        </button>
      )}
      <button
        type="button"
        className={`${btn} ${normal} ${
          clampedPage === 1 ? "opacity-40 cursor-not-allowed" : ""
        }`}
        onClick={() => goto(clampedPage - 1)}
        disabled={clampedPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={p}
            type="button"
            className={`${btn} ${p === clampedPage ? active : normal}`}
            aria-current={p === clampedPage ? "page" : undefined}
            onClick={() => goto(p)}
          >
            {p}
          </button>
        ) : (
          <span key={`${p}-${i}`} className={`${btn} ${muted} cursor-default`}>
            …
          </span>
        )
      )}

      <button
        type="button"
        className={`${btn} ${normal} ${
          clampedPage === totalPages ? "opacity-40 cursor-not-allowed" : ""
        }`}
        onClick={() => goto(clampedPage + 1)}
        disabled={clampedPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
      {showEdges && (
        <button
          type="button"
          className={`${btn} ${normal} ${
            clampedPage === totalPages ? "opacity-40 cursor-not-allowed" : ""
          }`}
          onClick={() => goto(totalPages)}
          disabled={clampedPage === totalPages}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  );
}
