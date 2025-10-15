import { useState } from "react";
import Counter from "@/components/Counter";

export default function CounterDemo() {
  const [count, setCount] = useState(1);
  return (
    <div className="space-y-4">
      <Counter defaultValue={1} onChange={setCount} />
      <div className="text-xs bg-stone-100 p-4 rounded-lg text-gray-500">
        현재 수량: <strong className="text-sm">{count}</strong>
      </div>
    </div>
  );
}
