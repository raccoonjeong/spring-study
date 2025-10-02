import { useState, useCallback, memo } from "react";

const Child = memo(function Child({ onAdd }) {
  console.log("[Child] 렌더링");
  return <button onClick={onAdd}>자식에서 +1</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 참조 고정 → props 동일성 유지
  const handleAdd = useCallback(() => setCount((c) => c + 1), []);

  console.log("[App] 렌더링");

  return (
    <div className="test">
      <h1>After: useCallback 사용</h1>
      <p>count: {count}</p>
      <Child onAdd={handleAdd} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
