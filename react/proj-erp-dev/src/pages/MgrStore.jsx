import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
export default function MgrStore() {
  const {
    data: stores,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/stores");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    // gcTime: 5 * 60_000, // 5분 후 가비지 컬렉션
  });

  if (isLoading) return <div>로딩중</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">MgrStore</h1>
      <div onClick={refetch}>데이터 갱신하기</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Addresss</TableHead>
            <TableHead>Tel</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell className="font-bold">{s.name}</TableCell>
              <TableCell>{s.addr}</TableCell>
              <TableCell>{s.tel}</TableCell>
              <TableCell className="text-xs text-stone-500">
                <div>{s.lat}</div>
                <div>{s.lng}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
