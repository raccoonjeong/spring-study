import Container from "@/components/Container";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

const soldOutImage = "";
// .prod_st.soldout .img_wrap:after {
//     content: "SOLD OUT";
//     position: absolute;
//     right: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, .2);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-weight: 800;
//     color: #fff;
//     font-size: 1.625em;
// }

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const mockData = [
    {
      id: 1,
      name: "고워크 맥스쿠셔닝 아치핏 (슬립인스)",
      originalPrice: 149000,
      sellingPrice: 149000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WWCFX091_1.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 161,
      sizeList: [
        { size: 220, isSoldOut: true },
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: true },
        { size: 235, isSoldOut: true },
        { size: 240, isSoldOut: false },
        { size: 245, isSoldOut: true },
        { size: 250, isSoldOut: true },
        { size: 255, isSoldOut: true },
        { size: 260, isSoldOut: true },
      ],
    },
    {
      id: 2,
      name: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)",
      originalPrice: 159000,
      sellingPrice: 159000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WRCFX062.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 110,
      sizeList: [
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: true },
        { size: 235, isSoldOut: true },
        { size: 240, isSoldOut: true },
        { size: 245, isSoldOut: false },
        { size: 250, isSoldOut: true },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: true },
      ],
    },
    {
      id: 3,
      name: "맥스쿠셔닝 포미",
      originalPrice: 69000,
      sellingPrice: 48300,
      discountRate: 30,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WSCEM013_01.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 847,
      sizeList: [
        { size: 220, isSoldOut: true },
        { size: 230, isSoldOut: false },
        { size: 240, isSoldOut: false },
        { size: 250, isSoldOut: false },
        { size: 260, isSoldOut: true },
      ],
    },
    {
      id: 4,
      name: "맥스쿠셔닝 포미",
      originalPrice: 69000,
      sellingPrice: 48300,
      discountRate: 30,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WSCEM011_01.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 847,
      sizeList: [
        { size: 220, isSoldOut: true },
        { size: 230, isSoldOut: true },
        { size: 240, isSoldOut: true },
        { size: 250, isSoldOut: true },
        { size: 260, isSoldOut: true },
      ],
    },
    {
      id: 5,
      name: "고런 맥스쿠셔닝 아치핏 (슬립인스)",
      originalPrice: 159000,
      sellingPrice: 159000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WRCFX053.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 232,
      sizeList: [
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: false },
        { size: 235, isSoldOut: true },
        { size: 240, isSoldOut: false },
        { size: 245, isSoldOut: false },
        { size: 250, isSoldOut: false },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: false },
      ],
    },
    {
      id: 6,
      name: "고런 맥스쿠셔닝 아치핏 (슬립인스)",
      originalPrice: 159000,
      sellingPrice: 159000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WRCFX052_1.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 232,
      sizeList: [
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: false },
        { size: 235, isSoldOut: true },
        { size: 240, isSoldOut: false },
        { size: 245, isSoldOut: false },
        { size: 250, isSoldOut: false },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: false },
      ],
    },
    {
      id: 7,
      name: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)",
      originalPrice: 159000,
      sellingPrice: 159000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WRCFX061_1.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 110,
      sizeList: [
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: true },
        { size: 235, isSoldOut: true },
        { size: 240, isSoldOut: true },
        { size: 245, isSoldOut: true },
        { size: 250, isSoldOut: true },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: true },
      ],
    },
    {
      id: 8,
      name: "맥스쿠셔닝 아치핏 2.0(슬립인스)",
      originalPrice: 149000,
      sellingPrice: 149000,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WRCEY051_1.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 71,
      sizeList: [
        { size: 225, isSoldOut: false },
        { size: 230, isSoldOut: false },
        { size: 235, isSoldOut: false },
        { size: 240, isSoldOut: false },
        { size: 245, isSoldOut: false },
        { size: 250, isSoldOut: false },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: false },
      ],
    },
    {
      id: 9,
      name: "[박은빈 착용] 고워크 아치핏 2.0 부츠(슬립인스)",
      originalPrice: 179000,
      sellingPrice: 125300,
      discountRate: 0,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP0WSCEW041_list.jpg?v=250904",
      starRate: 4.5,
      reviewCount: 101,
      sizeList: [
        { size: 225, isSoldOut: true },
        { size: 230, isSoldOut: false },
        { size: 235, isSoldOut: false },
        { size: 240, isSoldOut: false },
        { size: 245, isSoldOut: false },
        { size: 250, isSoldOut: false },
        { size: 255, isSoldOut: false },
        { size: 260, isSoldOut: true },
      ],
    },
  ];
  useEffect(() => {
    setProducts(mockData);
  }, []);
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
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                230
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                235
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                240
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs bg-[#0063ba] text-white">
                245
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                230
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                235
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                240
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                245
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                230
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                235
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                240
              </div>
              <div className="border rounded text-center py-2 font-semibold text-xs text-gray-600 border-gray-300">
                245
              </div>
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
