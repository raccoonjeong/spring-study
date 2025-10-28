import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStoreById } from "@/features/stores/queries";

export default function StoreDetail() {
  const { id } = useParams();
  const { store, isPending } = useStoreById(id);

  if (isPending) {
    return <div>로딩중...</div>;
  }
  return (
    <div>
      <div>{store.name}</div>
      <div>{store.add1}</div>
      <div>{store.add2}</div>
      <div>{store.tel}</div>
      <div>{store.lat}</div>
      <div>{store.lng}</div>
    </div>
  );
}
