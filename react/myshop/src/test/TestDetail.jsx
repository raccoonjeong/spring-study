import { products } from "./productData";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Counter from "@/components/Counter";
import SizeSelect from "@/components/SizeSelect";

export default function TestDetail() {
  const { id } = useParams();
  const nowProduct = products[id];
  const [size, setSize] = useState("");
  const [count, setCount] = useState("");

  return (
    <div>
      상세 페이지
      {JSON.stringify(nowProduct)}
      <h1>{nowProduct?.title}</h1>
      <div>{nowProduct?.price}</div>
      <Counter defaultValue={1} onChange={setCount}></Counter>
      <div>사이즈 {size}</div>
      <SizeSelect items={[240, 250, 260]} onChange={setSize}></SizeSelect>
    </div>
  );
}
