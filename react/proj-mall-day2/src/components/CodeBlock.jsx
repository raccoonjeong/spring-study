// src/components/CodeBlock.jsx
import React, { useMemo, useRef, useState } from "react";

export default function CodeBlock({ children }) {
  // MDX에서 pre를 매핑하면 children은 <code ...>...</code> 엘리먼트가 들어온다.
  const codeEl = React.isValidElement(children) ? (
    children
  ) : (
    <code>{children}</code>
  );

  const lang = useMemo(() => {
    const cls = codeEl.props.className || "";
    const token = cls.split(" ").find((c) => c.startsWith("language-"));
    return token ? token.replace("language-", "") : "text";
  }, [codeEl]);

  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      const text = codeRef.current?.innerText ?? "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <figure className="group relative my-4 rounded-lg border border-stone-200 bg-white/70">
      <div className="flex items-center justify-between px-3 py-1.5 text-xs text-stone-500">
        <span className="font-medium">{lang}</span>
        <button
          onClick={onCopy}
          className="rounded border border-stone-300  px-2 py-0.5 hover:bg-stone-100 active:scale-95"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* 가로 스크롤 */}
      <div className="overflow-x-auto">
        <pre className="m-0 px-4 py-3 min-w-full  whitespace-pre">
          {/* 원본 code 엘리먼트를 그대로 복제해서 하이라이트 span/class 보존 */}
          {React.cloneElement(codeEl, { ref: codeRef })}
        </pre>
      </div>
    </figure>
  );
}
