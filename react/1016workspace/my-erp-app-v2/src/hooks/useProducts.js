import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

function filterCategory(data = [], category = "all") {
  if (category === "all") return data;
  if (category === "new") return data.filter((p) => p.isNew);
  if (category === "best") return data.filter((p) => p.isBest);
  return data.filter((d) => d.category === category);
}

function filterSizes(data = [], filteredSizes = []) {
  // 240, 250, 260 을 클릭함. 그럼 230,240만 갖고있는 애들도 나와야 하고 260, 270만 갖고있는애도 나와야됨...
  function isIncludedFilteredSizes(size) {
    return filteredSizes.includes(size);
  }
  return data.filter((p) => p.sizes.some(isIncludedFilteredSizes));
}

export function useProducts(options = {}) {
  const {
    id,
    category,
    filteredSizes = [],
    page = 1,
    pageSize = 10,
  } = options || {};
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products", { page, pageSize }],
    queryFn: async function ({ queryKey }) {
      const searchParams = new URLSearchParams();
      const [, qs] = queryKey;
      searchParams.set("page", qs.page);
      searchParams.set("pageSize", qs.pageSize);
      const res = await fetch(
        `http://localhost:4000/api/products?${searchParams.toString()}`
      );
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

  const products = useMemo(() => {
    if (!data) {
      return [];
    }
    const filteredDataByCategory = filterCategory(data, category);
    const sizesByCategory = Array.from(
      new Set(filteredDataByCategory.flatMap((d) => d.sizes))
    ).sort();
    const filteredDataBySizes =
      filteredSizes.length > 0
        ? filterSizes(data, filteredSizes)
        : filteredDataByCategory;

    return { data: filteredDataBySizes, sizesByCategory };
  }, [data, category, filteredSizes]);

  const product = useMemo(() => {
    if (!id) {
      return {};
    }

    return data.find((p) => String(p.id) === String(id));
  }, [data, id]);
  return { products, product, isPending, isError, error, refetch };
}
