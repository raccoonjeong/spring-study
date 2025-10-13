import { useState } from "react";
import { requestAPI } from "../../api/requestAPI.js";
import { useNavigate } from "react-router-dom";
// email
// password
// nick
export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  // category
  // title
  // content
  const join = async function () {
    if (!email || !password || !passwordCheck || !nick) {
      alert(" 다 입력하세ㅐ요");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호를 확인해ㅜㅈ세여.");
      return;
    }
    try {
      const res = await requestAPI("/auth/register", {
        method: "POST",
        data: {
          email,
          password,
          nick,
        },
      });
      console.log("회원가입", res);
      if (!res?.id) {
        throw Error("회원가입에 실패하였습니다.");
      }
      alert("회원가입 성공!");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="space-y-2">
      <h1>회원가입</h1>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
      </div>
      <div>
        <input
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          placeholder="닉네임"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </div>
      <div>
        <input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder="비밀번호 확인"
        />
      </div>

      <div>
        <button onClick={join}>회원가입하기</button>
      </div>
    </div>
  );
}
