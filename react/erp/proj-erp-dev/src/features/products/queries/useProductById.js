import { useQuery } from "@tanstack/react-query";

export function useProductById(id, { initialProduct } = {}) {
  const { data, ...rest } = useQuery({
    queryKey: ["product", id],
    queryFn: async ({ signal }) => {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        signal,
      });
      console.log("res", res);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    placeholderData: initialProduct,
    staleTime: 30_000,
    retry: false, // 잘못된 id일 때 재시도 불필요
  });

  return {
    product: data ?? null,
    ...rest, // isPending, isError, error, refetch 등
  };
}
