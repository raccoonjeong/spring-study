// src/Sidebar.jsx
import { useMemo, useState, useCallback, useEffect } from "react";
import GithubSlugger from "github-slugger";
import folderMap from "./folderMap.json";
import classNames from "classnames";

const slugger = new GithubSlugger();

/** "12-foo" → { order:12, label:"foo" } / "foo" → { order:Infinity, label:"foo" } */
function parseOrderAndLabel(name) {
  const m = name.match(/^(\d+)[-_](.+)$/);
  if (!m) return { order: Number.POSITIVE_INFINITY, label: name };
  return { order: Number(m[1], 10), label: m[2] };
}

/** path 리스트 → 트리 구조로 변환 */
function buildTree(paths) {
  const root = { name: "root", label: "root", isDir: true, children: {} };

  for (const p of paths) {
    const rel = p.replace("../markdowns/", "");
    const parts = rel.split("/");
    let cur = root;

    parts.forEach((seg, i) => {
      const isLast = i === parts.length - 1;
      const isFile = isLast && seg.endsWith(".md");
      const base = isFile ? seg.replace(/\.md$/, "") : seg;
      const meta = parseOrderAndLabel(base);

      if (!cur.children[base]) {
        cur.children[base] = {
          name: base,
          label: meta.label,
          order: meta.order,
          isDir: !isFile,
          path: isFile ? p : undefined,
          children: {},
        };
      }
      cur = cur.children[base];
    });
  }
  return root;
}

/** 숫자 우선 정렬: order → 디렉터리 먼저(동률 시) → label */
function sortEntries(a, b) {
  if (a.order !== b.order) return a.order - b.order;
  if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
  return a.label.localeCompare(b.label, "ko");
}

function depthClass(d) {
  return ["pl-0", "pl-2", "pl-4", "pl-6", "pl-8", "pl-10"][Math.min(d, 5)];
}

function nodeKey(node, depth) {
  return `dir:${node.label}@${depth}`;
}

/* rehype-slug */
function extractH2Headings(md) {
  slugger.reset();
  return md
    .split(/\r?\n/)
    .map((line) => line.match(/^##\s+(.+?)\s*$/))
    .filter(Boolean)
    .map((m) => {
      const text = m[1].trim();
      return { text, id: slugger.slug(text) }; // rehype-slug와 동일한 id
    });
}

/** 특정 id로 스크롤 */
function scrollToHeading(id, opts = { behavior: "smooth", block: "start" }) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView(opts);
    // 포커스 보조 (접근성)
    if (typeof el.focus === "function") el.focus({ preventScroll: true });
  }
}

function Node({
  node,
  depth,
  current,
  onPick,
  openSet,
  toggleOpen,
  titleMap,
  currentHeadings,
  onClickHeading,
  viewerRef,
}) {
  if (!node) return null;

  // Node 컴포넌트 내부
  const displayName = node.isDir
    ? folderMap?.[node.name] || node.label // ★ 여기서 node.name 써야 함
    : node.path
    ? titleMap[node.path] || node.label
    : node.label;

  if (node.isDir) {
    const open = openSet.has(nodeKey(node, depth));
    const children = Object.values(node.children).sort(sortEntries);

    return (
      <div>
        {depth > 0 && (
          <button
            className={`flex w-full text-left items-center gap-2 text-sm px-3 py-1.5 rounded-md hover:bg-stone-200 ${depthClass(
              depth
            )}`}
            onClick={() => toggleOpen(node, depth)}
            title={displayName}
          >
            <span className="inline-block w-3 text-stone-500">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </span>
            <span
              className={classNames("flex-grow  font-semibold text-stone-700", {
                "!text-purple-500": open,
              })}
            >
              {displayName}
            </span>
          </button>
        )}
        {open && (
          <div className="border-l border-stone-300 pl-1 ml-3">
            {children.map((child) => (
              <Node
                key={child.path || `${child.label}-${depth}`}
                node={child}
                depth={depth + 1}
                current={current}
                onPick={onPick}
                openSet={openSet}
                toggleOpen={toggleOpen}
                titleMap={titleMap}
                currentHeadings={currentHeadings}
                onClickHeading={onClickHeading}
              />
            ))}
          </div>
        )}
        {depth === 0 && (
          <div>
            {children.map((child) => (
              <Node
                key={child.path || `${child.label}-top`}
                node={child}
                depth={1}
                current={current}
                onPick={onPick}
                openSet={openSet}
                toggleOpen={toggleOpen}
                titleMap={titleMap}
                currentHeadings={currentHeadings}
                onClickHeading={onClickHeading}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isActive = current === node.path;

  return (
    <div>
      <button
        className={`block w-full text-left text-sm px-3 py-1.5 rounded-md hover:bg-stone-200 ${depthClass(
          depth
        )} ${
          isActive
            ? "!text-purple-500 !bg-purple-50 font-medium"
            : "text-stone-700"
        }`}
        onClick={() => {
          onPick(node.path);
          if (viewerRef?.current) {
            viewerRef.current.scrollTo({ top: 0, behavior: "smooth" }); // ★ 최상단 이동
          }
        }}
        title={displayName}
      >
        {displayName}
      </button>

      {/* 현재 선택된 파일이면 바로 아래에 h2 목차 렌더 */}
      {isActive && currentHeadings?.length > 0 && (
        <ul className={`mt-1 border-l ml-4 pl-1 border-purple-200 mb-2`}>
          {currentHeadings.map(({ text, id }, idx) => (
            <li key={id || idx}>
              <a
                href={`#${id}`}
                className="block w-full text-left text-xs px-3 py-1 rounded-md text-purple-400 hover:bg-stone-200"
                title={text}
                onClick={(e) => {
                  // 기본 앵커 동작만으로도 충분하지만, 스무스 스크롤 원하면 이렇게 처리
                  e.preventDefault();
                  // 페이지 전체 스크롤일 때:
                  const el = document.getElementById(id);
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  // 주소 표시줄의 해시도 유지
                  history.replaceState(null, "", `#${id}`);
                }}
              >
                {text}
              </a>
              {/* <button
                className="block w-full text-left text-[13px] leading-5 px-3 py-1 rounded-md text-stone-600 hover:bg-stone-200"
                onClick={() => onClickHeading(id)}
                title={text}
              >
                {text}
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar({
  files,
  current,
  onPick,
  titleMap,
  viewerRef,
}) {
  const tree = useMemo(() => buildTree(Object.keys(files)), [files]);

  const [openSet, setOpenSet] = useState(() => new Set());
  const toggleOpen = useCallback((dirNode, depth) => {
    const key = nodeKey(dirNode, depth);
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // 현재 파일의 h2 목차 상태
  const [headings, setHeadings] = useState([]);

  // current가 바뀌면 파일 내용을 불러와 h2 추출
  useEffect(() => {
    let alive = true;
    async function load() {
      if (!current || !files[current]) {
        if (alive) setHeadings([]);
        return;
      }
      try {
        const loader = files[current];
        const md = await loader(); // () => Promise<string> 형태라고 가정
        const h2s = extractH2Headings(md);
        if (alive) setHeadings(h2s);
      } catch {
        if (alive) setHeadings([]);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [current, files]);

  const handleClickHeading = useCallback((id) => {
    scrollToHeading(id);
  }, []);

  return (
    <aside className="px-2 py-4">
      <div className="text-xs uppercase px-2 tracking-wider text-stone-500 mb-2">
        Docs
      </div>
      <Node
        node={tree}
        depth={0}
        current={current}
        onPick={onPick}
        openSet={openSet}
        toggleOpen={toggleOpen}
        titleMap={titleMap}
        currentHeadings={headings}
        onClickHeading={handleClickHeading}
        viewerRef={viewerRef}
      />
    </aside>
  );
}
