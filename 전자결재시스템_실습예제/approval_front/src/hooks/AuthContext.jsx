import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    empName: "",
    positionCd: "",
  });
  const [accessToken, setAccessToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 보호 API 호출: 401이면 refresh 재시도
  const BASE = "http://localhost:8080";
  const fetchWithAuth = useCallback(
    async (path, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "Content-Type": "application/json",
      };

      let res = await fetch(`${BASE}${path}`, {
        ...options,
        headers,
        credentials: "include",
      });

      if (res.status !== 401) return res;

      // 401 → refresh 시도
      const r = await fetch(`${BASE}/auth/token`, {
        method: "POST",
        credentials: "include",
      });

      const reData = await r.json();

      if (reData.status !== "succ") {
        // refresh 실패
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        setIsLogin(false);
        setUser({});
        setAccessToken(null);
        localStorage.removeItem("AT");
        localStorage.removeItem("ME");
        navigate("/", { replace: true });
        return;
      }
      console.log("Refresh token response:", reData);
      const { token: newToken } = reData.data;
      console.log("Refreshed token:", newToken);
      setAccessToken(newToken);

      // 재시도
      const headers2 = {
        ...(options.headers || {}),
        Authorization: `Bearer ${newToken}`,
        "Content-Type": "application/json",
      };
      return fetch(`${BASE}${path}`, {
        ...options,
        headers: headers2,
        credentials: "include",
      });
    },
    [accessToken]
  );

  const login = async function (userId, userPw, callback = () => {}) {
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!userPw) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const fetched = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // refresh 쿠키 수신
        body: JSON.stringify({ userId, userPw }),
      });

      const result = await fetched.json();

      if (result.status === "succ") {
        alert("로그인 성공!");
        setIsLogin(true);
        setUser(result.data.user);
        setAccessToken(result.data.token);

        localStorage.setItem("AT", result.data.token);
        localStorage.setItem("ME", JSON.stringify(result.data.user));

        callback();
        navigate("/list");
        return;
      }
      if (result.status === "fail") {
        alert(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async function () {
    if (!confirm("로그아웃 하시겠습니까?")) {
      return;
    }
    await fetchWithAuth(`/auth/logout`, {
      method: "POST",
    });

    alert("로그아웃 되었습니다.");

    setIsLogin(false);
    setUser({});
    setAccessToken(null);
    localStorage.removeItem("AT");
    localStorage.removeItem("ME");

    navigate("/", { replace: true });
  };

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    accessToken,
    setAccessToken,
    fetchWithAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
