import { cn } from "@/lib/utils";

export default function SizeFilter({ filteredSizes = [], setFilteredSizes }) {
  const sizes = [225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280];

  const handleToggle = (size) => {
    console.log("size", size);

    setFilteredSizes((prev) => {
      const next = new Set(prev);
      next.has(size) ? next.delete(size) : next.add(size);
      console.log("next", next);
      return [...next].sort((a, b) => a - b);
    });
  };
  return (
    <div>
      <div className="font-bold border-b border-black py-2 mb-2">Size</div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => handleToggle(s)}
            className={cn(
              "border px-2 py-1 border-stone-300",
              filteredSizes?.includes(s) && "bg-purple-200"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
