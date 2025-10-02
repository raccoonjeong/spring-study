# 4. 할일목록 4단계

```jsx
import { useState } from "react";
import "./TodoStep3.css"; // 같은 이름의 CSS

// 3단계: 2단계에 "삭제 버튼 + 삭제 확인 모달" 기능을 더함
export default function TodoStep3() {
  // 목록/토글/추가 로직
  const [todos, setTodos] = useState([
    { id: 1, text: "샘플: 리액트 공부하기", done: false },
    { id: 2, text: "샘플: 물 마시기", done: true },
  ]);

  const toggleDone = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newText, setNewText] = useState("");

  const handleAdd = () => {
    if (!newText.trim()) return;
    setTodos([{ id: Date.now(), text: newText, done: false }, ...todos]);
    setNewText("");
    setIsAddOpen(false);
  };

  // 삭제 모달 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // 삭제 모달 열기
  const askDelete = (id) => {
    setPendingDeleteId(id);
    setIsConfirmOpen(true);
  };

  // 실제 삭제
  const confirmDelete = () => {
    setTodos(todos.filter((t) => t.id !== pendingDeleteId));
    setPendingDeleteId(null);
    setIsConfirmOpen(false);
  };

  // 모달에서 보여줄 텍스트(선택)
  const pendingText = todos.find((t) => t.id === pendingDeleteId)?.text || "";

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

              {/* 삭제 버튼 */}
              <button className onClick={() => askDelete(todo.id)}>
                삭제
              </button>
            </li>
          ))
        )}
      </ul>

      {/* 추가 모달 */}
      {isAddOpen ? (
        <div className="modal-bg">
          <div className="modal">
            <h2>새 할 일 추가</h2>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="예) 점심 먹기"
            />
            <div className="modal-btns">
              <button onClick={() => setIsAddOpen(false)}>닫기</button>
              <button onClick={handleAdd}>추가</button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 삭제 확인 모달 */}
      {isConfirmOpen ? (
        <div className="modal-bg">
          <div className="modal">
            <h2>삭제하시겠습니까?</h2>
            {pendingText ? (
              <p>
                항목: <b>{pendingText}</b>
              </p>
            ) : null}
            <div className="modal-btns">
              <button onClick={() => setIsConfirmOpen(false)}>아니오</button>
              <button onClick={confirmDelete}>예</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```
