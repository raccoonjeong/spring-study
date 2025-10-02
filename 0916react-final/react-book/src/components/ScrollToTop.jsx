import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 URL 경로 감지

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 항상 맨 위로
  }, [pathname]);

  return null; // 화면에 아무것도 렌더링하지 않음
}

export default ScrollToTop;
