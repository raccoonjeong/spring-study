import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import clsx from "clsx";

export default function ProductCard({ product, idx }) {
  const { title, price, category, isNew, isBest, saleRate, priceBefore } =
    product || {};
  return (
    <Link to={`/products/detail/${idx + 1}`}>
      <Card
        className={clsx("font-bold text-lg", {
          "bg-pink-100": category === "women",
          "bg-blue-100": category === "men",
          "bg-green-100": category === "kids",
        })}
      >
        <div>{title}</div>
        <div>
          {saleRate ? (
            <div>
              [{saleRate}%] 할인가 {price}원 / 정가 {priceBefore}
            </div>
          ) : (
            <div>{price}원</div>
          )}
        </div>
        <div>{category}</div>
        {isNew && <div className="w-fit px-2 bg-rose-400 text-white">NEW</div>}
        {isBest && (
          <div className="w-fit px-2 bg-blue-400 text-white">BEST</div>
        )}
      </Card>
    </Link>
  );
}
