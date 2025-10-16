import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ProductCard({ product, idx }) {
  const { title, price, category, isNew, isBest, saleRate, priceBefore } =
    product;
  return (
    <Link to={`/products/detail/${idx + 1}`}>
      <Card
        className={clsx("font-bold text-lg", {
          "bg-pink-100": category === "women",
        })}
      >
        <div>{title}</div>
        <div>{price}</div>
        <div>{category}</div>
      </Card>
    </Link>
  );
}
