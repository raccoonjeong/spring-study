import Container from "@/components/Container";
import Button from "@/components/Button";
import { useState, useCallback, useRef } from "react";

function HoverZoomImage({
  src = "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904",
  alt = "",
  scale = 2, // 2배 확대
}) {
  const boxRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const handleMove = useCallback((e) => {
    const rect = boxRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // 경계 클램프
    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));
    setOrigin(`${x}px ${y}px`);
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative cursor-crosshair bg-gray-100 w-[600px] h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseMove={handleMove}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none select-none will-change-transform transition-transform duration-600 "
        style={{
          transform: isHover ? `scale(${scale})` : "scale(1)",
          transformOrigin: origin,
        }}
      />
    </div>
  );
}

function Counter({ defaultValue = 1, min = 1, onChange }) {
  const [qty, setQty] = useState(Math.max(defaultValue, min));

  const update = (next) => {
    const v = Math.max(min, next);
    setQty(v);
    onChange?.(v);
  };

  const dec = () => update(qty - 1);
  const inc = () => update(qty + 1);

  return (
    <div className="flex h-[38px] w-full max-w-[280px] border border-gray-300 overflow-hidden">
      <button
        type="button"
        onClick={dec}
        disabled={qty <= min}
        aria-label="수량 감소"
        className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <div className="flex-1 grid place-items-center text-lg select-none">
        {qty}
      </div>

      <button
        type="button"
        onClick={inc}
        aria-label="수량 증가"
        className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg hover:bg-gray-50"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <Container>
      <div className="py-8 flex space-x-8">
        <div className="space-y-2 max-w-[600px]">
          <div className="bg-gray-100 aspect-square max-w-[600px]">
            <HoverZoomImage />
            {/* <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904" /> */}
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="border-[#0063ba] border p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_2.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_3.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_4.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_5.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_6.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_7.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_8.jpg?v=250904" />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_9.jpg?v=250904" />
            </div>
          </div>
        </div>
        <div className="flex-grow space-y-3">
          <div className="font-extrabold text-4xl">아치핏 2.0 (슬립인스)</div>
          <div className="font-bold text-gray-500">ARCH FIT 2.0 (SLIP INS)</div>
          <div className="pb-4 text-xl">
            <span className="font-bold">129,000</span> 원
          </div>
          <div className="font-bold text-gray-700">SP3MDCFW022 NAT</div>
          <div className="font-bold">NAT</div>
          <div className="space-x-1 flex">
            <div className="border border-white hover:border-gray-300 cursor-pointer">
              <img
                className="h-[44px]"
                src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
              />
            </div>
            <div className="border border-[#0063ba] cursor-pointer">
              <img
                className="h-[44px]"
                src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
              />
            </div>
          </div>
          <div className="font-bold">SIZE</div>
          <div className="flex space-x-1">
            <Button>230</Button>
            <Button primary>235</Button>
            <Button>240</Button>
            <Button>245</Button>
          </div>
          <div className="font-bold">QTY</div>
          <Counter onChange={(v) => console.log("수량:", v)} />
          <div className="space-y-1 pt-8">
            <Button primary full size="lg">
              바로구매
            </Button>
            <div className="flex space-x-1">
              <Button full size="lg">
                장바구니
              </Button>
              <Button full size="lg">
                위시리스트
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
