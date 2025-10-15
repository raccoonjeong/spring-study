// src/App.jsx
import React, { Suspense, lazy, useRef, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

const modules = import.meta.glob("@/docs/**/*.mdx");

const metaMap = import.meta.glob("@/docs/**/*.mdx", {
  eager: true,
  import: "meta",
});

// 경로 → slug ('components/Button' 같은 하위경로 포함)
const toSlug = (p) => p.replace(/^\/src\/docs\//, "").replace(/\.mdx$/, "");

// slug(원본/소문자) → 실제 모듈 경로 맵
const slugKeyMap = new Map();
Object.keys(modules).forEach((path) => {
  const slug = toSlug(path);
  slugKeyMap.set(slug, path);
  slugKeyMap.set(slug.toLowerCase(), path);
});

// lazy 캐시
const lazyCache = new Map();
function getDocLazyBySlug(inputSlug) {
  const raw = String(inputSlug || "")
    .replace(/^\//, "")
    .replace(/\.mdx$/, "");
  const path = slugKeyMap.get(raw) || slugKeyMap.get(raw.toLowerCase());
  if (!path) return null;
  if (!lazyCache.has(path))
    lazyCache.set(
      path,
      lazy(() => modules[path]())
    );
  return lazyCache.get(path);
}

const re = /\/src\/docs\/(.+)\.mdx$/;
const docs = Object.entries(metaMap).map(([path, meta]) => {
  const slug = path.match(re)?.[1] || "";
  return {
    slug,
    title: meta?.title || slug,
    subtitle: meta?.subtitle,
    group: meta?.group,
    order: Number.isFinite(meta?.order) ? meta.order : 9999, // 그룹 내 정렬용
  };
});

function DocItem({ slug, title, subtitle }) {
  return (
    <Link to={`/docs/${slug}`} className="block group">
      <div className="flex items-center space-x-1 group-hover:text-purple-400">
        <span>{title || slug}</span>
        {subtitle && (
          <span className="text-xs text-gray-400 group-hover:text-purple-400">
            {subtitle}
          </span>
        )}
      </div>
    </Link>
  );
}

// export default function DocBySlug({ slugOverride }) {
//   const params = useParams();
//   // ✅ /docs/* (하위폴더)도 받고, /docs/:slug도 함께 커버
//   const slug = slugOverride || params["*"] || params.slug || "intro";

//   const Doc = useMemo(() => getDocLazyBySlug(slug), [slug]);
//   if (!Doc) return <div className="p-6">문서를 찾을 수 없어: {slug}</div>;

//   return (
//     <Suspense fallback={<div className="p-6">로딩중…</div>}>
//       <Doc />
//     </Suspense>
//   );
// }

function Sidebar() {
  // 그룹 묶기
  const groups = docs.reduce((acc, d) => {
    (acc[d.group] ||= []).push(d);
    return acc;
  }, {});

  // ← 여기서 순서를 원하는 대로 고정
  const GROUP_ORDER = [
    "Getting Started",
    "Components",
    "Samples",
    "Pages",
    "API",
  ];

  const orderMap = Object.fromEntries(GROUP_ORDER.map((g, i) => [g, i]));

  // 그룹 이름 정렬: 고정 순서 → 이름순
  const groupNames = Object.keys(groups).sort((a, b) => {
    const ai = orderMap[a] ?? 1e9;
    const bi = orderMap[b] ?? 1e9;
    return ai === bi ? a.localeCompare(b) : ai - bi;
  });

  return (
    <div className="p-4 w-full text-gray-600 text-sm shrink-0 space-y-3 h-screen overflow-auto">
      <div className="font-bold text-black text-base mb-4">Docs</div>
      {groupNames.map((g) => {
        // 그룹 내부: order 오름차순 → title 이름순
        const items = [...groups[g]].sort(
          (a, b) => a.order - b.order || a.title.localeCompare(b.title)
        );
        return (
          <div key={g} className="space-y-2 pt-1">
            <div className="text-xs text-gray-400 font-bold">{g}</div>
            <div className="pl-2 space-y-2 border-l border-gray-300">
              {items.map((d) => (
                <DocItem
                  key={d.slug}
                  slug={d.slug}
                  title={d.title}
                  subtitle={d?.subtitle}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DocBySlug({ slug: slugOverride }) {
  const params = useParams();

  //const { slug: slugFromUrl } = useParams();
  //const slug = slugOverride || slugFromUrl || "intro";
  const slug = slugOverride || params["*"] || params.slug || "intro";
  // 문서(slug) 변경 시 스크롤 맨 위로

  const contentRef = useRef(null);

  useLayoutEffect(() => {
    // 윈도우 스크롤도 함께 올리고 싶으면 유지
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    // 메인 컨텐트 스크롤 박스
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const Doc = React.useMemo(() => getDocLazyBySlug(slug), [slug]);
  if (!Doc) return <div className="p-6">문서를 찾을 수 없어: {slug}</div>;

  return (
    <Suspense fallback={<div className="p-6">로딩중…</div>}>
      <div className="flex w-full h-screen">
        <div className="w-[260px] bg-stone-50 shrink-0 min-h-screen overflow-auto">
          <Sidebar />
        </div>
        <div
          ref={contentRef}
          className="flex-grow p-6 w-[calc(100vw-260px)] h-screen overflow-auto"
        >
          <div className="max-w-4xl w-full mx-auto">
            <Doc />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
