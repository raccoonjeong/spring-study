import { Link } from "react-router-dom";
import { cn, fmtComma } from "@/lib/utils";
import StarRating from "@/components/common/StarRating";

export default function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    rating,
    img,
    category,
    sizes,
    disabledSizes,
    isNew,
    isBest,
  } = product;
  return (
    <Link to={`/products/detail/${id}`} className="h-[260pt]">
      <div
        className={cn("bg-stone-100 border group p-4 rounded-lg shadow", {
          "bg-rose-200": category === "women",
          "bg-blue-200": category === "men",
          "bg-green-200": category === "kids",
        })}
      >
        <div>
          <img src={img} className="w-[100px] h-[100px]" />
        </div>
        <div>[{category}]</div>
        <div className="font-bold">{title}</div>
        <div>{fmtComma(price)}원</div>
        <div>
          <StarRating rating={rating} />
        </div>
        <div className="flex space-x-2">
          {isNew && (
            <div className="bg-red-500 w-fit text-white text-xs px-1 py-0.5 rounded">
              NEW
            </div>
          )}
          {isBest && (
            <div className="bg-primary w-fit text-white text-xs px-1 py-0.5 rounded">
              BEST
            </div>
          )}
        </div>
        <div className="hidden group-hover:block">
          <div className="flex flex-wrap text-xs gap-1">
            {sizes.map((s) => (
              <div
                key={s}
                className={
                  disabledSizes?.includes(s) ? "text-red-500 line-through" : ""
                }
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
