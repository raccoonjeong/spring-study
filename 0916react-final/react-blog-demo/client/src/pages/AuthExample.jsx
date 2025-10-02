import { useState } from "react";
import { requestAPI } from "../api/requestAPI";

export default function AuthExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");
  const [me, setMe] = useState(null);

  async function handleRegister() {
    const user = await requestAPI("/auth/register", {
      method: "POST",
      data: { email, password, nick },
    });
    setMe(user);
  }

  async function handleLogin() {
    const user = await requestAPI("/auth/login", {
      method: "POST",
      data: { email, password },
    });
    setMe(user);
  }

  async function handleLogout() {
    await requestAPI("/auth/logout", { method: "POST" });
    setMe(null);
  }

  async function fetchMe() {
    const user = await requestAPI("/auth/me");
    setMe(user);
  }

  return (
    <div className="p-4 space-y-2">
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="nick (회원가입용)"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
      />

      <div className="space-x-2">
        <button onClick={handleRegister}>회원가입</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={fetchMe}>내정보 확인</button>
      </div>

      {me && (
        <div>
          현재 로그인: {me.nick} ({me.email})
        </div>
      )}
    </div>
  );
}
