import { useQuery } from "@tanstack/react-query";

export function useProducts(options = {}) {
  const {
    category = "all",
    filteredSizes = [],
    page = 1,
    pageSize = 5,
  } = options || {};

  const { data, ...rest } = useQuery({
    queryKey: ["products", { page, pageSize, category, filteredSizes }],
    queryFn: async ({ signal, queryKey }) => {
      const [, params] = queryKey; // params : 쿼리키(배열[])의 두번째 요소
      const sp = new URLSearchParams();
      sp.set("page", String(params.page));
      sp.set("pageSize", String(params.pageSize));
      if (params.category && params.category !== "all")
        sp.set("category", params.category);
      if (params.filteredSizes?.length)
        sp.set("sizes", params.filteredSizes.join(","));
      console.log("sp", sp.toString());
      const res = await fetch(
        `http://localhost:4000/api/products?${sp.toString()}`,
        { signal } //signal : React Query가 넘겨준 AbortSignal을 fetch에 전달 (요청 취소 처리)
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json(); // { items, total, totalPages, ... }
    },
    placeholderData: (prev) => prev, // 페이지 전환 시 이전 데이터 유지
    //staleTime: 30_000,
  });

  return {
    // 리스트 & 페이징 메타
    products: data?.items,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    pageSize,
    // 상태 : isPending, error, isError ...
    ...rest,
  };
}
