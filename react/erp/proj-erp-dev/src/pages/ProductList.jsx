import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "@/features/products/queries";
import { ProductCard, SizeFilter } from "@/features/products/components";
import PageNav from "@/components/common/PageNav";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const { category } = useParams();
  const { products, isPending, total, totalPages } = useProducts({
    page,
    category,
    filteredSizes,
  });

  useEffect(() => {
    setPage(1);
  }, [category, filteredSizes]);

  if (isPending) return <div>로딩중</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">
        {category ? category.toUpperCase() : "ALL"}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb-8">
        <div className="lg:sticky lg:top-[60px] h-fit pb-4">
          <div>total: {total}</div>
          <div>totalPages: {totalPages}</div>
          <div>filteredSizes: {JSON.stringify(filteredSizes)}</div>
          <SizeFilter
            filteredSizes={filteredSizes}
            setFilteredSizes={setFilteredSizes}
          />
        </div>
        <div className="col-span-3">
          {!total && (
            <div className="py-40 text-center">해당하는 상품이 없습니다.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mx-auto w-fit">
            <PageNav
              page={page} // 현재 페이지
              totalPages={totalPages} // 전체 페이지 수
              onChange={(next) => {
                setPage(next); // 상태 갱신 → useQuery 등으로 리패치
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
