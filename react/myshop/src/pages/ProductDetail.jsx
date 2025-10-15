import Button from "@/components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "@/data/sampleData";
export default function ProductDetail() {
  const { id } = useParams();
  const [nowSize, setNowSize] = useState(null);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    isNew: "",
    isBest: "",
    originalPrice: "",
    sellingPrice: "",
    discountRate: "",
    img: "",
    starRate: "",
    reviewCount: "",
    sizeList: [],
  });

  useEffect(() => {
    const currentProduct = getProduct(id);
    setProduct(currentProduct);
    const center = Math.floor(currentProduct.sizeList.length / 2);
    debugger;
    setNowSize(currentProduct.sizeList[center].size);
  }, [id]);

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
              {Number(product.sellingPrice).toLocaleString()}
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
            {product.sizeList.map((option, i) => (
              <Button primary={Number(option.size) === Number(nowSize)} key={i}>
                <div>{option.size}</div>
              </Button>
            ))}
          </div>
          <div className="font-bold">QTY</div>
          <div className="flex h-[38px] w-full max-w-[280px] border border-gray-300 overflow-hidden">
            <button
              type="button"
              disabled=""
              aria-label="수량 감소"
              className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                ></path>
              </svg>
            </button>
            <div className="flex-1 grid place-items-center text-lg select-none">
              1
            </div>
            <button
              type="button"
              aria-label="수량 증가"
              className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </button>
          </div>
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
