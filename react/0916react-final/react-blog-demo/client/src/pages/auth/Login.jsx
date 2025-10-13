import { useState } from "react";
import { requestAPI } from "../../api/requestAPI.js";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("hs@example.com");
  const [password, setPassword] = useState("1234");
  const { me, setMe } = useAuth();
  const navigate = useNavigate();

  const login = async function () {
    try {
      const res = await requestAPI("/auth/login", {
        method: "POST",
        data: { email, password },
      });
      setMe(res);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      Login
      <div>
        <label>
          이메일
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={login}>로그인</button>
      </div>
    </div>
  );
}
