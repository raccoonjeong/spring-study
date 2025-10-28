import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ProductCard({ product }) {
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
    <Link to={`/products/detail/${id}`}>
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
        <div>{price}</div>
        <div>{rating}점</div>
        <div>
          {isNew && <div>NEW</div>}
          {isBest && <div>BEST</div>}
        </div>
        <div className="hidden group-hover:block">
          <div className="flex flex-wrap gap-1">
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
