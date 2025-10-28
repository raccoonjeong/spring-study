import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/features/ProductCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

function SizeFilter({ filteredSizes = [], setFilteredSizes }) {
  const sizes = [225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280];

  const handleToggle = (size) => {
    console.log("size", size);

    setFilteredSizes((prev) => {
      const next = new Set(prev);
      next.has(size) ? next.delete(size) : next.add(size);
      console.log("next", next);
      return [...next].sort((a, b) => a - b);
    });
  };
  return (
    <div>
      <div>filteredSizes {filteredSizes.join(" ")}</div>
      <div className="font-bold border-b border-black py-2 mb-2">Size</div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <div
            key={s}
            onClick={() => handleToggle(s)}
            className={cn(
              "border px-2 py-1 border-stone-300",
              filteredSizes?.includes(s) && "bg-purple-200"
            )}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function ProductList() {
  const { category } = useParams();
  const [filteredSizes, setFilteredSizes] = useState([]);
  const { products, isPending } = useProducts({ category, filteredSizes });

  if (isPending) return <div>로딩중</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">
        {category ? category.toUpperCase() : "ALL"}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb-8">
        <SizeFilter
          filteredSizes={filteredSizes}
          setFilteredSizes={setFilteredSizes}
        />
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
