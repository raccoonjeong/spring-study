import { useState, memo } from "react";

const Child = memo(function Child({ onAdd }) {
  console.log("[Child] 렌더링");
  return <button onClick={onAdd}>자식에서 +1</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 매번 새 함수가 생성됨 → 자식에게 다른 props로 전달됨
  const handleAdd = () => setCount((c) => c + 1);

  console.log("[App] 렌더링");

  return (
    <div className="test">
      <h1>Before: useCallback 없음</h1>
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
