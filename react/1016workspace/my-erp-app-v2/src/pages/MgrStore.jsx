import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function MgtStore() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["stores"],
    queryFn: async function () {
      const res = await fetch("http://localhost:4000/api/stores");
      if (!res.ok) {
        console.log("ERROR");
        return;
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">상품관리</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>지점명</TableHead>
              <TableHead>주소</TableHead>
              <TableHead>상세주소</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.add1}</TableCell>
                <TableCell>{p.add2}</TableCell>
                <TableCell>{p.tel}</TableCell>
                <TableCell className="text-xs text-stone-500">
                  {p.lat} {p.lng}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
