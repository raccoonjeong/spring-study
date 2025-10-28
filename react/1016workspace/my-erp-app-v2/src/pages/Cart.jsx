import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Cart() {
  const carts = JSON.parse(localStorage.getItem("cart")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>상품명</TableHead>
            <TableHead>가격</TableHead>
            <TableHead>사이즈</TableHead>
            <TableHead>수량</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell className="font-bold">{p.title}</TableCell>
              <TableCell>{p.price?.toLocaleString()}원</TableCell>
              <TableCell>{p.size}</TableCell>
              <TableCell>{p.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
