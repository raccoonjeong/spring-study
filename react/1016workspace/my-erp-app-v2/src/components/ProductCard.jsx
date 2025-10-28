import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, id }) {
  const {
    title,
    img,
    price,
    category,
    isNew,
    isBest,
    saleRate,
    priceBefore,
    sizes,
    disabled = [],
    rating,
    reviewCount,
  } = product || {};
  const [isAllSoldOut, setIsAllSoldOut] = useState(false);

  useEffect(() => {
    if (!sizes || !disabled) {
      return;
    }
    setIsAllSoldOut(sizes.length === disabled.length);
  }, [product]);

  return (
    <Link to={`/products/detail/${id}`}>
      <Card
        className={cn("font-bold text-lg group", {
          "bg-pink-100": category === "women",
          "bg-blue-100": category === "men",
          "bg-green-100": category === "kids",
        })}
      >
        <CardHeader>
          <img src={img} />
          <CardDescription>{category}</CardDescription>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {saleRate ? (
              <div>
                <span className="text-red-600">[{saleRate}%]</span> 할인가{" "}
                {price}원 / 정가 {priceBefore}
              </div>
            ) : (
              <div>{price}원</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden group-hover:block">
            <div className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <div
                  className={disabled?.includes(s) ? "text-red-500" : ""}
                  key={s}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>{rating}</div>
          <div className="flex space-x-4">
            {isNew && (
              <div className="w-fit px-2 bg-rose-400 text-white">NEW</div>
            )}
            {isBest && (
              <div className="w-fit px-2 bg-blue-400 text-white">BEST</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
