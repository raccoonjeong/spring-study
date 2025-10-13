# 3. 할일목록 3단계

```jsx
import { useState } from "react";
import "./TodoStep2.css"; // 같은 이름의 CSS

// 2단계: 1단계에 "추가 버튼 + 추가 모달" 기능을 더함
export default function TodoStep2() {
  // 목록/토글은 1단계와 동일
  const [todos, setTodos] = useState([
    { id: 1, text: "샘플: 리액트 공부하기", done: false },
    { id: 2, text: "샘플: 물 마시기", done: true },
  ]);

  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // 추가 모달 열림 상태 & 입력 값
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newText, setNewText] = useState("");

  // 할 일 추가
  const handleAdd = () => {
    if (!newText.trim()) return;
    setTodos([{ id: Date.now(), text: newText, done: false }, ...todos]);
    setNewText("");
    setIsAddOpen(false);
  };

  return (
    <div className="todo-container">
      <h1>할 일 목록</h1>

      {/* 추가 버튼 */}
      <button onClick={() => setIsAddOpen(true)}>+ 새 할 일</button>

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

      {/* 추가 모달 (삼항연산자) */}
      {isAddOpen ? (
        <div className="modal-bg">
          <div className="modal">
            <h2>새 할 일 추가</h2>
            <div>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="예) 점심 먹기"
              />
            </div>
            <div className="modal-btns">
              <button onClick={() => setIsAddOpen(false)}>닫기</button>
              <button onClick={handleAdd}>추가</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```
