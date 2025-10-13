import { useRef, useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";

export function Login({ showLogin, setShowLogin }) {
  const { setUser, setIsLogin, setAccessToken, login } = useAuth();

  const idRef = useRef("");
  const pwRef = useRef("");

  useEffect(() => {
    const token = localStorage.getItem("AT");
    const me = localStorage.getItem("ME");
    if (token) {
      console.log("Found token in localStorage:", token);
      setAccessToken(token);
      setUser(JSON.parse(me));
      setIsLogin(true);
    }
  }, []);
  return (
    showLogin && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
          {/* 모달 타이틀 */}
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            로그인
          </h2>

          {/* 입력 영역 */}
          <div className="space-y-3">
            <input
              type="text"
              ref={idRef}
              defaultValue="pg111"
              placeholder="아이디"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              defaultValue="a1234"
              ref={pwRef}
              placeholder="비밀번호"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() =>
                login(idRef.current.value, pwRef.current.value, () =>
                  setShowLogin(false)
                )
              }
              className="w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              로그인
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  );
}
