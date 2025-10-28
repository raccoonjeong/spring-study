import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";

export default function MgrProduct() {
  const { products, isPending } = useProducts();

  if (isPending) return <div>로딩중</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">MgrProduct</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sizes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell className="font-bold">{p.title}</TableCell>
                <TableCell>{p.price}원</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="text-xs text-stone-500">
                  {p.sizes.join(" ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
