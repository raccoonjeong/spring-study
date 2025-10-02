import { useState, useMemo } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);

  console.log("컴포넌트 렌더링 시작");

  // value가 변경될 때만 재계산
  const result = useMemo(() => {
    console.log("계산 실행");
    return value * 2;
  }, [value]);

  return (
    <div className="test">
      <h1>Test2</h1>
      <div>value: {value}</div>
      <div>result = {result}</div>
      <div>렌더링 카운트: {count}</div>

      <button onClick={() => setCount(count + 1)}>렌더링 하기</button>

      <button onClick={() => setValue(value + 1)}>value 증가</button>
    </div>
  );
}

export default Example;
