import { useState } from "react";

export default function Counter({ defaultValue = 1, min = 1, onChange }) {
  const [qty, setQty] = useState(Math.max(defaultValue, min));

  const update = (next) => {
    const v = Math.max(min, next);
    setQty(v);
    onChange?.(v);
  };

  const dec = () => update(qty - 1);
  const inc = () => update(qty + 1);

  return (
    <div className="flex h-[38px] w-full max-w-[280px] border border-gray-300 overflow-hidden">
      <button
        type="button"
        onClick={dec}
        disabled={qty <= min}
        aria-label="수량 감소"
        className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <div className="flex-1 grid place-items-center text-lg select-none">
        {qty}
      </div>

      <button
        type="button"
        onClick={inc}
        aria-label="수량 증가"
        className="w-10 cursor-pointer shrink-0 grid place-items-center text-lg hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
