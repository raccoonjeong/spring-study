import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Toggle from "@/components/Toggle";
import { useParams } from "react-router-dom";

function Option({ children, active }) {
  return (
    <div
      className={`border rounded text-center py-2 font-semibold text-xs ${
        active ? "bg-[#0063ba] text-white" : " text-gray-600 border-gray-300"
      }`}
    >
      {children}
    </div>
  );
}

export default function ProductList() {
  const { category: nowCategory } = useParams();
  const products = [
    {
      id: 1,
      title: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)",
      price: 15900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      isNew: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [240],
    },
    {
      id: 2,
      title: "신발2",
      price: 17900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      soldout: true,
      isBest: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [230, 235, 240, 245],
    },
    {
      id: 3,
      title: "신발3",
      price: 9800,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      isSoldout: false,
      isNew: true,
      isBest: true,
      category: "women",
      sizes: [230, 235, 240, 245],
      disabledSizes: [235, 240],
    },
    {
      id: 4,
      title: "고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)4",
      price: 15900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      isNew: true,
      category: "kids",
      sizes: [200, 210, 220, 230],
      disabledSizes: [210],
    },
    {
      id: 5,
      title: "신발5",
      price: 17900,
      img: "https://cdn.skecherskorea.co.kr/pro_img/SP3WJCFF011_1.jpg?v=250904",
      soldout: true,
      isBest: true,
      category: "men",
      sizes: [250, 260, 270, 280],
      disabledSizes: [270],
    },
  ];

  const filteredProducts = products?.filter((p) =>
    nowCategory === "new"
      ? p.isNew
      : nowCategory === "best"
      ? p.isBest
      : p.category === nowCategory
  );
  return (
    <Container>
      <div className="py-8 grid grid-cols-5 gap-8">
        <div>
          <div className="font-bold text-3xl mb-2">
            {nowCategory.toUpperCase()}
          </div>
          <div className="font-bold text-xl mb-8 text-gray-500">
            {filteredProducts?.length || 0} Results
          </div>
          <div className="border-t py-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold">사이즈</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Option>230</Option>
              <Option>235</Option>
              <Option>240</Option>
              <Option active>245</Option>
              <Option>230</Option>
              <Option>235</Option>
              <Option>240</Option>
              <Option>245</Option>
              <Option>230</Option>
              <Option>235</Option>
              <Option>240</Option>
              <Option>245</Option>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex h-[100px] justify-end items-center space-x-8">
            <div>상품명순</div>
            <Toggle initial={true} label={["필터열기", "필터닫기"]} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {products
              ?.filter((p) =>
                nowCategory === "new"
                  ? p.isNew
                  : nowCategory === "best"
                  ? p.isBest
                  : p.category === nowCategory
              )
              ?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
          <div className="flex justify-center mt-16 ">
            <div className="flex items-center space-x-4 w-fit px-10 py-3 rounded hover:text-[#203864] hover:border-[#203864] text-[#3382c8] border-2 border-[#3382c8] cursor-pointer">
              <div className="font-bold">LOAD MORE</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
