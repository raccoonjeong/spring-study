// Book.jsx
import { useRef, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Viewer from "../components/Viewer.jsx";
import { Link } from "react-router-dom";

// 모든 md를 raw 문자열로 동적 임포트
const files = import.meta.glob("../markdowns/**/*.md", {
  query: "?raw",
  import: "default",
});

/** md 첫 줄에서 제목 추출: '# 제목' 또는 '제목' */
function extractTitle(md) {
  if (!md) return "";
  const first = md.split(/\r?\n/).find((l) => l.trim().length > 0) || "";
  return first.replace(/^#+\s*/, "").trim();
}

export default function Book() {
  const viewerRef = useRef(null);

  const fileMap = useMemo(() => files, []);
  const [current, setCurrent] = useState(() => {
    const hash =
      typeof window !== "undefined"
        ? decodeURIComponent(location.hash.slice(1))
        : "";
    return hash && fileMap[hash] ? hash : Object.keys(fileMap)[0] || null;
  });

  const [titleMap, setTitleMap] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 모바일 오프캔버스 열림
  const [noTransition, setNoTransition] = useState(false); // 애니메이션 억제(열 때/리사이즈)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false
  );

  // 제목 맵 구성
  useEffect(() => {
    let alive = true;
    (async () => {
      const entries = Object.entries(fileMap);
      const result = {};
      for (const [path, loader] of entries) {
        try {
          const md = await loader();
          const title = extractTitle(md);
          if (title) result[path] = title;
        } catch (e) {
          console.warn("제목 파싱 실패:", path, e);
        }
      }
      if (alive) setTitleMap(result);
    })();
    return () => {
      alive = false;
    };
  }, [fileMap]);

  // 해시 변경 → 선택 문서 변경
  useEffect(() => {
    const onHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h && fileMap[h]) setCurrent(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [fileMap]);

  const handlePick = (path) => {
    location.hash = encodeURIComponent(path);
    setCurrent(path);
    setIsSidebarOpen(false); // 모바일: 항목 선택 시 닫기(→ 닫힘 애니메이션)
  };

  // 모바일: 열릴 때 첫 프레임 transition 제거 → 즉시 표시
  useEffect(() => {
    if (isSidebarOpen) {
      setNoTransition(true);
      const id = requestAnimationFrame(() => setNoTransition(false));
      return () => cancelAnimationFrame(id);
    }
  }, [isSidebarOpen]);

  // 리사이즈 중 애니메이션 억제(디바운스)
  useEffect(() => {
    let timer = null;
    const onResize = () => {
      setNoTransition(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setNoTransition(false), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // 데스크톱/모바일 브레이크포인트 감지
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      setIsDesktop(e.matches);
      setNoTransition(true);
      const id = requestAnimationFrame(() => setNoTransition(false));
      return () => cancelAnimationFrame(id);
    };
    mql.addEventListener?.("change", onChange);
    mql.addListener?.(onChange); // 구형 폴백
    return () => {
      mql.removeEventListener?.("change", onChange);
      mql.removeListener?.(onChange);
    };
  }, []);

  // 모바일에서 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (!isSidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSidebarOpen]);

  // ─────────────────────────────────────────────────────────────
  // 데스크톱 레이아웃: Grid (헤더2 + 컨텐츠2) / 모바일: 본문 헤더만 보임
  // ─────────────────────────────────────────────────────────────
  const gridCls = `
    hidden lg:grid
    grid-cols-[18rem_minmax(0,1fr)]
    grid-rows-[2.5rem_minmax(0,1fr)]
    h-screen
  `; // 2.5rem = 40px

  // 모바일 본문 헤더는 항상 표시
  const mobileHeader = (
    <div className="lg:hidden h-10 flex items-center justify-between border-b border-stone-300 px-2 bg-white">
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="inline-flex items-center px-2 py-1 text-sm"
        aria-controls="book-sidebar"
        aria-expanded={isSidebarOpen}
        aria-label="Open sidebar"
      >
        ☰
      </button>
    </div>
  );

  // 사이드바 패널(모바일 오프캔버스)
  const asideBase =
    "fixed left-0 top-0 inset-x-auto bottom-0 z-50 w-80 max-w-[85vw] border-r border-stone-600  bg-white";
  const motionClass = isSidebarOpen ? "translate-x-0" : "-translate-x-full";
  const transitionClass =
    isDesktop || noTransition
      ? "transition-none"
      : "transition-transform duration-200";

  return (
    <div className="relative">
      {/* 데스크톱: 2×2 그리드 (사이드바 헤더 / 본문 헤더 / 사이드바 내용 / 본문 내용) */}
      <div className={gridCls}>
        <div className="h-10 border-b border-stone-300 flex items-center px-4">
          <Link to="/" className="font-extrabold">
            Book
          </Link>
        </div>
        <div className="h-10 border-b border-stone-300 flex items-center justify-between px-3">
          <div className="text-sm font-medium"></div>
        </div>

        {/* Row 2: 내용들 */}
        <aside className="border-r border-stone-300 overflow-auto">
          <Sidebar
            files={fileMap}
            current={current}
            onPick={handlePick}
            titleMap={titleMap}
            viewerRef={viewerRef}
          />
        </aside>

        <main className="overflow-auto bg-white">
          <div className="px-2 py-2">
            <Viewer ref={viewerRef} loader={fileMap} currentPath={current} />
          </div>
        </main>
      </div>

      {/* 모바일: 본문 헤더 + 본문 내용 */}
      <div className="lg:hidden h-screen flex flex-col">
        {mobileHeader}
        <main className="flex-1 overflow-auto mac-scroll  bg-white">
          <Viewer ref={viewerRef} loader={fileMap} currentPath={current} />
        </main>
      </div>

      {/* 모바일 오프캔버스 사이드바 (자체 헤더 포함) */}
      <aside
        id="book-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
        className={["lg:hidden", asideBase, motionClass, transitionClass].join(
          " "
        )}
      >
        {/* 사이드바 자체 헤더 (모바일 전용) */}
        <div className="h-10 bg-stone-50 border-b border-stone-300 flex items-center justify-between px-3">
          <span className="text-sm font-medium">목차</span>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="inline-flex items-center rounded-md px-2 py-1 text-sm"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <div className="bg-stone-50 h-[calc(100vh-40px)] overflow-auto">
          <Sidebar
            files={fileMap}
            current={current}
            onPick={handlePick}
            titleMap={titleMap}
            viewerRef={viewerRef}
          />
        </div>
      </aside>

      {/* 모바일 오버레이(본문 헤더는 비켜감) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
