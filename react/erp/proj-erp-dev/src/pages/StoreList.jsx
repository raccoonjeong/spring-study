import { useState, useEffect } from "react";
import { useStores } from "@/features/stores/queries";
import { Link } from "react-router-dom";
import PageNav from "@/components/common/PageNav";

export default function StoreList() {
  const [page, setPage] = useState(1);
  const { stores, isPending, total, totalPages } = useStores({
    page,
    pageSize: 20,
  });

  useEffect(() => {
    setPage(1);
  }, []);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <div className="flex flex-col space-y-4">
        {stores.map((s) => (
          <Link to={`/stores/${s.id}`}>
            <div>
              <span>{s.name}</span> /<span>{s.add1}</span>
            </div>
          </Link>
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
  );
}
