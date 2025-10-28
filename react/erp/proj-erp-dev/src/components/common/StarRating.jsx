import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";
//https://lucide.dev/guide/advanced/filled-icons

export default function StarRating({ rating = 0, size = 18, className }) {
  const max = 5;
  const full = Math.floor(rating);
  const hasHalf = rating - full > 0;
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, i) => (
          <Star key={i} fill="#999" stroke="#999" size={size} strokeWidth={2} />
        ))}
      </div>
      <div className="flex items-center gap-1 absolute top-0 left-0">
        {Array.from({ length: max }).map((_, i) => {
          // 꽉 찬 별
          if (i < full) {
            return (
              <Star
                key={i}
                fill="yellow"
                stroke="#999"
                size={size}
                strokeWidth={2}
              />
            );
          }
          // 반쪽 별
          if (i === full && hasHalf) {
            return (
              <StarHalf
                key={i}
                fill="yellow"
                stroke="#999"
                size={size}
                strokeWidth={2}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
