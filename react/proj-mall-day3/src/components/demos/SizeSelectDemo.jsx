import { useState } from "react";
import SizeSelect from "@/components/SizeSelect.jsx";

export default function SizeSelectDemo() {
  const [size, setSize] = useState(235);
  return (
    <div className="space-y-4">
      <SizeSelect
        items={[230, 235, 240, 245]}
        value={size}
        disabled={[240]}
        onChange={setSize}
      />
      <div className="text-xs bg-stone-100 p-4 rounded-lg text-gray-500">
        선택된 사이즈: <strong className="text-sm">{size}</strong>
      </div>
    </div>
  );
}
