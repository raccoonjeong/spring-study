import { useQuery } from "@tanstack/react-query";

export function useStores(options = {}) {
  const { page = 1, pageSize = 5 } = options || {};

  const { data, ...rest } = useQuery({
    queryKey: ["stores", { page, pageSize }],
    queryFn: async ({ signal, queryKey }) => {
      // signal: React Query가 넘겨준ㅡㄴ
      const [, params] = queryKey; // params : 쿼리키(배열[])의 두번째 요소
      const sp = new URLSearchParams();
      sp.set("page", String(params.page));
      sp.set("pageSize", String(params.pageSize));

      console.log("sp", sp.toString());
      const res = await fetch(
        `http://localhost:4000/api/stores?${sp.toString()}`,
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
    stores: data?.items,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    pageSize,
    // 상태 : isPending, error, isError ...
    ...rest,
  };
}
