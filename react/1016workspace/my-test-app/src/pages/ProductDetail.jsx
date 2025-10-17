import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "@/data/productsData";
import clsx from "clsx";

export default function ProductDetail() {
  const { id } = useParams();

  const [size, setSize] = useState(null);
  const [count, setCount] = useState(1);
  const nowProduct = products.find((p) => Number(p.idx) === Number(id));
  const { title, saleRate, price, priceBefore, disabledSizes, sizes } =
    nowProduct;

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

    alert("장바구니에 담겼습니다.");
  };
  const handleSize = function (s) {
    if (nowProduct.disabledSizes && nowProduct.disabledSizes.includes(s)) {
      return;
    }
    setSize(s);
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ProductDetail</h1>
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
        {nowProduct?.sizes.map((s) => (
          <div
            className={clsx("border border-black px-2 py-1 ", {
              "bg-blue-500 text-white": size === s,
              " text-gray-400 line-through":
                nowProduct.disabledSizes &&
                nowProduct.disabledSizes.includes(s),
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
          className={`border px-3 py-1 ${count === 1 ? "text-gray-300" : ""}`}
          onClick={handleCountMinus}
        >
          -
        </div>
        <div className="w-[50px] text-center">{count}</div>
        <div className="border px-3 py-1" onClick={handleCountPlus}>
          +
        </div>
      </div>
      <div onClick={handleCart} className="border px-2 py-1 w-fit border-black">
        장바구니에 넣기
      </div>
    </div>
  );
}
