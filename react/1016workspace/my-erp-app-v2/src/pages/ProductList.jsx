import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SizeFilter({ sizes, filteredSizes = [], setFilteredSizes }) {
  const handleToggle = function (size) {
    if (filteredSizes.includes(size)) {
      setFilteredSizes((prev) => prev.filter((s) => s !== size));
    } else {
      setFilteredSizes((prev) => {
        return [...new Set([...prev, size])];
      });
    }
  };

  return (
    <>
      {sizes.map((s) => (
        <Button
          variant="outline"
          className={filteredSizes.includes(s) ? "bg-purple-300" : ""}
          onClick={() => handleToggle(s)}
        >
          {s}
        </Button>
      ))}
    </>
  );
}

function PageNav() {
  return (
    <div className="px-4">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  );
}

export default function ProductList() {
  const page = 1;
  const { category } = useParams();
  const [filteredSizes, setFilteredSizes] = useState([]);
  const { products, isPending, isError, error, refetch } = useProducts({
    category,
    filteredSizes,
  });

  if (isPending) {
    return <div>로딩중...</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold">ProductList {category}</h1>{" "}
      {JSON.stringify(filteredSizes)}
      <div className="flex flex-col lg:flex-row lg:items-start space-x-8">
        <div className="grid gap-2 my-8 w-full grid-cols-4 lg:w-1/6">
          <SizeFilter
            sizes={products.sizesByCategory}
            filteredSizes={filteredSizes}
            setFilteredSizes={setFilteredSizes}
          ></SizeFilter>
        </div>
        <div className="grid gap-4 my-8 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:w-5/6">
          {products.data.map((p) => (
            <ProductCard key={`product-${p.id}`} id={p.id} product={p} />
          ))}
          <PageNav />
        </div>
      </div>
    </>
  );
}
