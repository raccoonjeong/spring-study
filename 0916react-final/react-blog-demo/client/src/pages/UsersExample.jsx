import { useEffect, useState } from "react";
import { requestAPI } from "../api/requestAPI";

export default function UsersExample() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    requestAPI("/users").then((res) => setUsers(res.rows));
  }, []);

  return (
    <div className="p-4">
      <h2>회원 목록</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.nick} ({u.email}) - 가입일 {u.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}
