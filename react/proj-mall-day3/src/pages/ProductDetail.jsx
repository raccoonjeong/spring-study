import Container from "@/components/Container";
import Button from "@/components/Button";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "@/utils/formatNumber";
import clsx from "clsx";
import Counter from "@/components/Counter";

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

function SizeSelect({
  items = [],
  value,
  defaultValue = null,
  onChange,
  disabled = [],
  allowClear = false,
  className = "",
}) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const selected = isControlled ? value : inner;

  const isDisabled = (v) => disabled?.includes?.(v);

  const select = (v) => {
    if (isDisabled(v)) return;
    const next = allowClear && v === selected ? null : v;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div role="radiogroup" className={`flex gap-1 ${className}`}>
      {items.map((v) => {
        const isSel = selected === v;
        return (
          <Button
            key={v}
            onClick={() => select(v)}
            disabled={isDisabled(v)}
            primary={isSel}
          >
            {v}
          </Button>
        );
      })}
    </div>
  );
}

export default function ProductDetail() {
  const { id: nowId } = useParams();
  const [nowImg, setNowImg] = useState(null);
  const [nowProduct, setNowProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [count, setCount] = useState(1);

  const products = [
    {
      id: 1,
      title: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)",
      price: 15900,
      thumb:
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904",
      imgs: [
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_2.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_3.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_4.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_5.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_6.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_7.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_8.jpg?v=250904",
        "https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_9.jpg?v=250904",
      ],
      isNew: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [240],
    },
    {
      id: 2,
      title: "신발2",
      price: 17900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      soldout: true,
      isBest: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [230, 235, 240, 245],
    },
    {
      id: 3,
      title: "신발3",
      price: 9800,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      isSoldout: false,
      isNew: true,
      isBest: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [235, 240],
    },
    {
      id: 4,
      title: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)4",
      price: 15900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      isNew: true,
      category: "kids",
      sizes: [200, 210, 220, 230],
      disabledSizes: [210],
    },
    {
      id: 5,
      title: "신발5",
      price: 17900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      soldout: true,
      isBest: true,
      category: "men",
      sizes: [250, 260, 270, 280],
      disabledSizes: [270],
    },
  ];

  useEffect(() => {
    if (nowId) {
      const foundProduct = products.find((p) => p.id === Number(nowId));
      setNowProduct(foundProduct);
      setNowImg(foundProduct?.thumb);
    } else {
      setNowProduct(null);
    }
  }, [nowId]);

  return (
    <Container>
      <div className="py-8 flex space-x-8">
        <div className="space-y-2 max-w-[600px]">
          <div className="bg-gray-100 aspect-square max-w-[600px]">
            <HoverZoomImage src={nowImg} />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {nowProduct?.imgs?.map((img) => (
              <div
                onClick={() => setNowImg(img)}
                className={clsx(
                  " border-gray-200 border p-2 aspect-square cursor-pointer"
                )}
              >
                {/*border-[#0063ba]*/}
                <img src={img} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow space-y-3">
          <div className="font-extrabold text-4xl">{nowProduct?.title}</div>
          <div className="font-bold text-gray-500">ARCH FIT 2.0 (SLIP INS)</div>
          <div className="pb-4 text-xl">
            <span className="font-bold">{formatNumber(nowProduct?.price)}</span>{" "}
            원
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
            <SizeSelect
              items={nowProduct?.sizes}
              disabled={nowProduct?.disabledSizes}
              allowClear={false}
              value={size}
              onChange={setSize}
            />
          </div>
          <div className="font-bold">QTY</div>
          <Counter defaultValue={1} onChange={setCount} />
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
