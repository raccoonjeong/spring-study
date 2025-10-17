import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Home() {
  return (
    <h1 className="text-2xl font-bold">
      Home
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="sm" variant="outline">
          버튼
        </Button>
        <Button variant="outline">버튼</Button>
        <Button size="lg" variant="outline">
          버튼
        </Button>
      </div>
      <div>
        <Card>
          <CardContent>상품 정보</CardContent>
        </Card>
      </div>
    </h1>
  );
}
