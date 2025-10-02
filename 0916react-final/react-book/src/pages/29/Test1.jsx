import { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const value = 10;
  console.log("컴포넌트 렌더링 시작");

  function calculate() {
    console.log("계산 실행");
    return value * 2;
  }

  const result = calculate();

  return (
    <div className="test">
      <h1>Test1</h1>
      <div>value: {value}</div>
      <div>result = {result}</div>
      <div>렌더링 카운트: {count}</div>

      <div>
        <button onClick={() => setCount(count + 1)}>렌더링 하기</button>
      </div>
    </div>
  );
}
export default Example;
