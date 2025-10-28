import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function Cart() {
  const productsInCart = JSON.parse(localStorage.getItem("shopping-cart"));
  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div>{JSON.stringify(productsInCart)}</div>
      <div>
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
            {productsInCart?.map((p, idx) => (
              <TableRow key={idx}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.size}</TableCell>
                <TableCell>{p.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
