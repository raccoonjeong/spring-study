import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { Link } from "react-router-dom";
import { mockData } from "@/data/sampleData";

export default function Home() {
  return (
    <div>
      <div className="h-[300px] w-full bg-stone-200"></div>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="pt-16 pb-8 font-extrabold text-4xl text-center">
          WEEKLY BEST
        </div>
        <div className="flex font-extrabold text-xl pb-16 space-x-16 justify-center">
          <div>WOMEN</div>
          <div className="text-gray-300">MEN</div>
          <div className="text-gray-300">KIDS</div>
        </div>
        <div className="grid grid-cols-5 gap-8">
          {mockData.map((data) => (
            <ProductCard key={data.id} product={data} />
          ))}
          {/* x 10 */}
        </div>
        <div className="pt-16 pb-8 font-extrabold text-4xl text-center">
          NEW ARRIVAL
        </div>
        <div className="flex font-extrabold text-xl pb-16 space-x-16 justify-center">
          <div>WOMEN</div>
          <div className="text-gray-300">MEN</div>
          <div className="text-gray-300">KIDS</div>
        </div>
        <div className="grid grid-cols-5 gap-8">
          {mockData.map((data) => (
            <ProductCard key={data.id} product={data} />
          ))}
          {/* x 10 */}
        </div>
      </div>
    </div>
  );
}
