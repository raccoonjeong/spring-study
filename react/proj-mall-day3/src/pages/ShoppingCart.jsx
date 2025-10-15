import ShorppingOrderTable from "@/components/ShoppingOrderTable";
import Container from "@/components/Container";

export default function ShoppingCart() {
  return (
    <Container>
      <div className="py-8 space-y-4">
        <div className="font-bold text-3xl pb-4">장바구니</div>
        <ShorppingOrderTable />
      </div>
    </Container>
  );
}
