import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">ProductDetail id : {id}</h1>;
}
