// Viewer.jsx
import { useEffect, forwardRef, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github-dark.css";

function PreWithCopy(props) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = preRef.current ? preRef.current.innerText : "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // 일부 브라우저/환경에서 실패 시 선택 영역 복사 fallback
      const range = document.createRange();
      range.selectNodeContents(preRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="relative group viewer-scroll">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-md border px-2 py-1 text-xs
                   bg-white/80 hover:bg-white backdrop-blur-sm
                   border-stone-300 text-stone-700
                   opacity-0 group-hover:opacity-100 transition"
        aria-label="코드 복사"
        title="코드 복사"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

const Viewer = forwardRef(function Viewer({ loader, currentPath }, ref) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!currentPath) return;
    loader[currentPath]().then((txt) => setSrc(txt));
  }, [currentPath, loader]);

  if (!currentPath) {
    return (
      <div className="p-6 text-stone-500">좌측에서 문서를 선택하세요.</div>
    );
  }

  return (
    <article
      ref={ref}
      className="prose prose-lg dark:prose-invert max-w-4xl w-full p-8"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={{
          pre: (props) => <PreWithCopy {...props} />, // ← 추가: pre 렌더링을 커스텀 컴포넌트로
        }}
      >
        {src}
      </ReactMarkdown>
    </article>
  );
});

export default Viewer;
