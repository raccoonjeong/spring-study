import { useState, useEffect } from "react";
import clsx from "clsx";

function useShowWhenScrolled(threshold = 120) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(y > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll(); // 초기 상태 반영
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}

export default function TopButton() {
  const visible = useShowWhenScrolled(120);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      className={clsx(
        `cursor-pointer border-white border-2 rounded-full h-[60px] w-[60px] 
        flex flex-col items-center justify-center
        bg-primary text-white 
        transition-colors duration-200 
      `,
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
      <div className="text-xs font-bold">TOP</div>
    </button>
  );
}
