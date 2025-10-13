# CSS

```css
.todo-container {
  max-width: 420px;
  margin: 24px auto;
  padding: 12px;
  font-family: sans-serif;
  background: #f9f9f9;
  border-radius: 8px;
}

.todo-container h1 {
  margin: 0 0 8px;
  font-size: 20px;
}

.todo-container button {
  margin: 0;
  padding: 6px 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 6px;
}
.todo-container button:hover {
  background: #eee;
}

.todo-container ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
.todo-container li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.todo-container input[type="checkbox"] {
  margin-right: 8px;
}
.done {
  text-decoration: line-through;
  color: #888;
}

.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 320px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
  font-size: 18px;
}
.modal input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-btns {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
```
