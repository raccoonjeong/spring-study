import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItems } = useCart();

  const [size, setSize] = useState(null);
  const [count, setCount] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [`product-${id}`],
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

  // const { title, saleRate, price, priceBefore, disabledSizes, sizes } =
  //   product;

  const handleCountPlus = function () {
    setCount(count + 1);
  };
  const handleCountMinus = function () {
    setCount(count > 1 ? count - 1 : count);
  };
  const handleCart = function () {
    console.log("handleCart");

    if (!size) {
      alert("사이즈를 선택해주세요");
      return;
    }

    if (count < 1) {
      alert("최소 수량은 1 이상이어야 합니다");
      return;
    }

    const data = {
      id,
      title: product.title,
      price: product.price,
      size,
      count,
    };
    addItems(data);
    alert("장바구니에 담겼습니다.");
  };
  const handleSize = function (s) {
    if (nowProduct.disabled && nowProduct.disabled.includes(s)) {
      return;
    }
    setSize(s);
  };
  let nowProduct = {};
  if (isLoading) {
    return <div>로딩중...</div>;
  } else {
    nowProduct = product;
  }
  return (
    <div className="space-y-4 ">
      <h1 className="text-2xl font-bold">ProductDetail</h1>
      <div className="flex space-x-8">
        <div className="flex-1">
          <img src={nowProduct?.img} />
        </div>
        <div className="flex-1 space-y-4 ">
          <div>상품제목: {nowProduct?.title}</div>
          <div>
            가격:{" "}
            {nowProduct?.saleRate ? (
              <div>
                {" "}
                <span className="text-red-500">
                  {nowProduct?.saleRate}% 할인가
                </span>{" "}
                {nowProduct?.price} /
                <span className="text-gray-400 line-through">
                  {" "}
                  정가 {nowProduct?.priceBefore}{" "}
                </span>
              </div>
            ) : (
              <div>정가 {nowProduct?.price}</div>
            )}
          </div>
          <div>Size {size}</div>
          <div className="flex space-x-4">
            {nowProduct?.sizes.sort().map((s) => (
              <div
                className={clsx("border border-black px-2 py-1 ", {
                  "bg-blue-500 text-white": size === s,
                  " text-gray-400 line-through":
                    nowProduct.disabled && nowProduct.disabled.includes(s),
                })}
                key={s}
                onClick={() => handleSize(s)}
              >
                {s}
              </div>
            ))}
          </div>
          <div>count {count}</div>
          <div className="flex space-x-4 border border-black w-fit">
            <div
              className={cn("border px-3 py-1", {
                "text-gray-300": count === 1,
              })}
              onClick={handleCountMinus}
            >
              -
            </div>
            <div className="w-[50px] text-center">{count}</div>
            <div className="border px-3 py-1" onClick={handleCountPlus}>
              +
            </div>
          </div>
          <div
            onClick={handleCart}
            className="border px-2 py-1 w-fit border-black"
          >
            장바구니에 넣기
          </div>
        </div>
      </div>
    </div>
  );
}
