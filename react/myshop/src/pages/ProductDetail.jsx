import Button from "@/components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getProduct } from "@/data/sampleData";
import Counter from "@/components/Counter";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail() {
  const { id } = useParams();
  const [nowSize, setNowSize] = useState(null);

  const {
    data: product,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      const res = await fetch(`http://localhost:4000/api/products/${id}`);
      if (!res.ok) {
        console.log("ERROR");
        return;
      }
      return res.json();
    },
    staleTime: 60_000, // 동안 신선
    refetchOnWindowFocus: true, // fresh하면 안바꾸고 stale 상태일 때만 적용.
    // 윈도우를 보고 있으면 리패치
  });

  const [nowCount, setNowCount] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }
    const center = Math.floor(product.sizes.length / 2);
    setNowSize(product.sizes[center].size);
  }, [product]);

  const isAllSoldOut = useMemo(() => {
    if (!product?.sizes) {
      return false;
    }
    product.sizes?.length === product.disabled?.length;
  }, [product]);

  const sizeOptionsWithStatus = useMemo(() => {
    if (!product?.sizes) {
      return [];
    }
    return product.sizes.map((size) => {
      return {
        size: size,
        isSoldOut:
          product.disabled?.length > 0
            ? product.disabled.includes(size)
            : false,
      };
    });
  }, [product]);

  if (isPending) return <div>상품 정보를 로딩 중입니다...</div>;
  if (!product) return <div>표시할 상품이 없습니다.</div>;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4">
      <div className="py-8 flex space-x-8">
        <div className="space-y-2 max-w-[600px]">
          <div className="bg-gray-100 aspect-square max-w-[600px]">
            <div className="relative cursor-crosshair bg-gray-100 w-[600px] h-[600px] overflow-hidden">
              <img
                alt=""
                draggable="false"
                className="w-full h-full object-cover pointer-events-none select-none will-change-transform transition-transform duration-600"
                src={product.img}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="border-[#0063ba] border p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
            <div className="border border-gray-200 p-2 aspect-square cursor-pointer">
              <img src={product.img} />
            </div>
          </div>
        </div>
        <div className="flex-grow space-y-3">
          <div className="font-extrabold text-4xl">{product.name}</div>
          <div className="font-bold text-gray-500">{product.name}</div>
          <div className="pb-4 text-xl">
            <span className="font-bold">
              {Number(product.price).toLocaleString()}
            </span>{" "}
            원
          </div>
          <div className="font-bold text-gray-700">SP3MDCFW022 NAT</div>
          <div className="font-bold">NAT</div>
          <div className="space-x-1 flex">
            <div className="border border-white hover:border-gray-300 cursor-pointer">
              <img className="h-[44px]" src={product.img} />
            </div>
            <div className="border border-[#0063ba] cursor-pointer">
              <img className="h-[44px]" src={product.img} />
            </div>
          </div>
          <div className="font-bold">SIZE</div>
          <div className="flex space-x-1">
            {sizeOptionsWithStatus.map((option, i) => (
              <Button
                primary={Number(option.size) === Number(nowSize)}
                key={i}
                onClick={() => setNowSize(option.size)}
              >
                <div>{option.size}</div>
              </Button>
            ))}
          </div>
          <div className="font-bold">QTY</div>
          <Counter defaultValue={1} onChange={setNowCount} />
          <div className="space-y-1 pt-8">
            <Button full primary size="lg">
              <div>바로구매</div>
            </Button>
            <div className="flex space-x-1">
              <Button full size="lg">
                <div>장바구니</div>
              </Button>
              <Button full size="lg">
                <div>위시리스트</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
