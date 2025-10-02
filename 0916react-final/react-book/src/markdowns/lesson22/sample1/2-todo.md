# 2. 할일목록 2단계

```jsx
import { useState } from "react";
import "./TodoStep1.css"; // 컴포넌트와 같은 이름의 CSS

// 1단계: 목록 뿌리기 + 체크박스 토글(취소선)
export default function TodoStep1() {
  // 초기 할 일 목록 (done: 완료 여부)
  const [todos, setTodos] = useState([
    { id: 1, text: "샘플: 리액트 공부하기", done: false },
    { id: 2, text: "샘플: 물 마시기", done: true },
  ]);

  // 체크박스 클릭 시 완료/미완료 토글
  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="todo-container">
      <h1>할 일 목록</h1>
      <ul>
        {todos.length === 0 ? (
          <li>아직 할 일이 없습니다.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo.id)}
                />
                <span className={todo.done ? "done" : ""}>{todo.text}</span>
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
```
