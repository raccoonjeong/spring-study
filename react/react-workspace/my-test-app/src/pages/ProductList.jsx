import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { products } from "@/data/productData";

function ProductCard({ product, idx }) {
  return (
    <Link to={`/products/detail/${idx + 1}`}>
      <div className="p-4 border rounded">{product?.title}</div>
    </Link>
  );
}

export default function ProductList() {
  const { category } = useParams();

  return (
    <>
      <h1 className="text-2xl font-bold">ProductList {category}</h1>
      <div className="grid grid-cols-4 gap-4 my-8">
        {products.map((p, idx) => (
          <ProductCard key={`product-${idx}`} idx={idx} product={p} />
        ))}
      </div>
    </>
  );
}
