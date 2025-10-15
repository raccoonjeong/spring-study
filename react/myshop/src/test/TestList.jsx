import { products } from "@/test/productData";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function TestList() {
  const { category: nowCategory } = useParams();
  const filteredProducts = nowCategory
    ? products.filter((p) => p.category === nowCategory)
    : [];

  return (
    <div>
      <div>category {nowCategory}</div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {filteredProducts.map((p, idx) => (
          <Link to={`/test/detail/${idx}`}>
            {p.category && <div>{p.category}</div>}
            <div className="border p-4 bg-green-50">{p.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
