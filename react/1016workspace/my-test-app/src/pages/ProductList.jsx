import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { products } from "@/data/productsData";
import ProductCard from "@/components/ProductCard";

export default function ProductList() {
  const { category } = useParams();

  const filteredProducts = products.filter((p) => p.category === category);
  return (
    <>
      <h1 className="text-2xl font-bold">ProductList {category}</h1>
      <div className="grid grid-cols-4 gap-4 my-8">
        {filteredProducts.map((p, idx) => (
          <ProductCard key={`product-${idx}`} idx={idx} product={p} />
        ))}
      </div>
    </>
  );
}
