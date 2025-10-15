import StarRating from "@/components/StarRating";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    id,
    name,
    isNew = false,
    isBest = false,
    originalPrice,
    sellingPrice,
    discountRate,
    img,
    starRate,
    reviewCount,
    sizeList,
  } = product;

  const isSoldOut = sizeList.every((option) => option.isSoldOut);

  return (
    <Link to={`/products/detail/${id}`} data-discover="true">
      <div className="py-2 space-y-2 group min-h-[500px]">
        <div className="bg-stone-100 w-[200px] h-[200px] relative">
          <img src={img} className="w-full aspect-square" />
          {isSoldOut && (
            <div class="absolute top-0 left-0 bottom-0 right-0 bg-black/20 flex items-center justify-center">
              <div class="text-white font-extrabold text-2xl">SOLD OUT</div>
            </div>
          )}
        </div>
        <div className="hidden space-x-2 group-hover:flex">
          <div className="py-1 hover:border-b border-[#0063ba]">
            <img className="h-[44px]" src={img} />
          </div>
          <div className="py-1 border-b border-[#0063ba]">
            <img className="h-[44px]" src={img} />
          </div>
        </div>
        <div className="font-bold">{name}</div>
        <StarRating score={starRate} count={reviewCount} />
        <div className="text-gray-500">
          <span className="font-bold mr-0.5 text-black">
            {Number(sellingPrice).toLocaleString()}
          </span>
          원
        </div>
        {isNew && (
          <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
            NEW
          </div>
        )}
        {isBest && (
          <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
            BEST
          </div>
        )}
        <div className="text-gray-400 py-1 relative">
          <div className="font-bold text-[8pt] pb-2">SIZE</div>
          <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
            <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
              {sizeList.map((option) => (
                <div className={option.isSoldOut && "text-gray-300"}>
                  {option.size}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
