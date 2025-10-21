import Container from "@/components/Container";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useRef, useMemo } from "react";
// import { mockData } from "@/data/sampleData";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
  const { category } = useParams();
  const [nowSize, setNowSize] = useState(245);
  const [sizeList, setSizeList] = useState([]);
  const isFirst = useRef(true);

  const {
    data: products,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      const res = await fetch("http://localhost:4000/api/products");
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

  // 2. useMemo를 사용하여 데이터 조작 (파생 상태 생성)
  // products나 isLoading 상태가 변경될 때만 로직 실행
  const processedProducts = useMemo(() => {
    if (!products) return [];

    const currentCategoryData = products.filter(
      (data) => data.category === category
    );

    const currentSizeList = Array.from(
      new Set(currentCategoryData.flatMap((data) => data.sizes))
    ).sort();
    setSizeList(currentSizeList);

    const currentSizeData = currentCategoryData.filter((p) =>
      p.sizes.includes(Number(nowSize))
    );

    if (isFirst.current) {
      const center = Math.floor(currentSizeList.length / 2);
      setNowSize(currentSizeList[center]);
      isFirst.current = false;
    }

    return currentSizeData;
  }, [products, nowSize]);

  if (isPending) return <div>상품 정보를 로딩 중입니다...</div>;
  if (!processedProducts || processedProducts.length === 0)
    return <div>표시할 상품이 없습니다.</div>;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4">
      <div className="py-8 grid grid-cols-5 gap-8">
        <div>
          <div className="font-bold text-3xl mb-2">신상품</div>
          <div className="font-bold text-xl mb-8 text-gray-500">
            275 Results
          </div>
          <div className="border-t py-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold">사이즈</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizeList.map((size) => (
                <div
                  className={`border rounded text-center py-2 font-semibold text-xs ${
                    size === nowSize
                      ? "bg-[#0063ba] text-white"
                      : "text-gray-600 border-gray-300"
                  }`}
                  onClick={() => setNowSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex h-[100px] justify-end items-center space-x-8">
            <div>상품명순</div>
            <div className="flex items-center space-x-2">
              <span>필터닫기</span>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 bg-[#0063ba]"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-6"></span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {products.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <div className="flex items-center space-x-4 w-fit px-10 py-3 rounded hover:text-[#203864] hover:border-[#203864] text-[#3382c8] border-2 border-[#3382c8] cursor-pointer">
              <div className="font-bold">LOAD MORE</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
