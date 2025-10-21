import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "@/hooks/useProducts";

export default function MgtProduct() {
  const { products, isPending, isError, error, refetch } = useProducts();

  if (isPending) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">상품관리</h1>
      <div onClick={refetch}>리패치하기</div>
      <div>
        {/* {JSON.stringify(data)} */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>정가</TableHead>
              <TableHead>판매가</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>사이즈</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell className="font-bold">{p.title}</TableCell>
                <TableCell>{p.priceBefore?.toLocaleString()}원</TableCell>
                <TableCell>{p.price?.toLocaleString()}원</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="text-xs text-stone-500">
                  {p.sizes.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
