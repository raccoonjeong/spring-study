import { useState } from "react";
import Button from "@/components/Button";

export default function SizeSelect({
  items = [],
  value, // controlled 모드 값 (옵션)
  defaultValue = null, // uncontrolled 초기값
  onChange,
  disabled = [],
  className = "",
}) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const selected = isControlled ? value : inner;

  const isDisabled = (v) => disabled?.includes?.(v);

  const select = (v) => {
    if (isDisabled(v)) return;
    if (v === selected) return; // 같은 값 클릭 시 아무 동작 없음(해제 불가)
    if (!isControlled) setInner(v);
    onChange?.(v);
  };

  return (
    <div role="radiogroup" className={`flex gap-1 ${className}`}>
      {items.map((v) => {
        const isSel = selected === v;
        return (
          <Button
            key={v}
            type="button"
            onClick={() => select(v)}
            disabled={isDisabled(v)}
            primary={isSel}
            role="radio"
            aria-checked={isSel}
          >
            {v}
          </Button>
        );
      })}
    </div>
  );
}
