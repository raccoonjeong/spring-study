import ShorppingOrderTable from "@/components/ShoppingOrderTable";
import Container from "@/components/Container";

export default function ShoppingOrder() {
  return (
    <Container>
      <h1 className="py-8 font-semibold text-2xl">주문서작성</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <ShorppingOrderTable />
        </div>
        <div>dd</div>
      </div>
    </Container>
  );
}
