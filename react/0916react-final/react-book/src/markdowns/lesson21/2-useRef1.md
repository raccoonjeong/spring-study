# 2. useRef 사용하기

## DOM 요소 접근 예제 (입력창에 포커스 주기)

```jsx
import { useRef } from "react";

export default function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // ref.current → 실제 input DOM 노드
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="여기에 입력하세요" />
      <button onClick={handleFocus}>포커스 이동</button>
    </div>
  );
}
```

- 버튼을 누르면 input 박스로 커서가 자동으로 이동합니다.

## 값 저장소 예제 (렌더링 안 일으킴)

```jsx
import { useRef, useState } from "react";

export default function ClickCounter() {
  const [renderCount, setRenderCount] = useState(0);
  const clickCount = useRef(0); // 여기에 누적 저장

  const handleClick = () => {
    clickCount.current += 1; // 값은 변하지만 리렌더링은 없음
    setRenderCount(renderCount + 1); // 화면을 강제로 업데이트
  };

  return (
    <div>
      <p>렌더링 횟수: {renderCount}</p>
      <p>버튼 클릭 횟수: {clickCount.current}</p>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}
```

- useRef는 .current에 저장된 값이 바뀌어도 컴포넌트가 리렌더링되지 않습니다.

- 그래서 변수처럼 값은 유지하고 싶지만 화면 갱신은 원치 않을 때 많이 써요.
