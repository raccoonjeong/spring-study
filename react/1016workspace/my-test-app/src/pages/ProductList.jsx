import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
  const { category: nowCategory } = useParams();
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async function () {
      const res = await fetch("http://localhost:4000/api/products");
      if (!res.ok) {
        console.log("ERROR");
        return;
      }
      return res.json();
    },
    staleTime: 60_000, // 동안 신선
    refetchOnWindowFocus: true, // fresh하면 안바꾸고 stale 상태일 때만 적용.
    // 윈도우를 보고 있으면 리패치
  });

  let filteredProducts = [];

  if (isLoading) {
    return <div>로딩중...</div>;
  } else {
    filteredProducts = nowCategory
      ? nowCategory === "new"
        ? products.filter((p) => p.isNew)
        : nowCategory === "best"
        ? products.filter((p) => p.isBest)
        : products.filter((p) => p.category === nowCategory)
      : products;
  }
  return (
    <>
      <h1 className="text-2xl font-bold">ProductList {nowCategory}</h1>
      <div className="grid grid-cols-4 gap-4 my-8">
        {filteredProducts.map((p) => (
          <ProductCard key={`product-${p.id}`} id={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
