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
  //   const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    // TODO: localStorage 이용 필요
    userId: "",
    empName: "",
    positionCd: "",
  });
  const [accessToken, setAccessToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false); // TODO: localStorage 이용 필요

  //   const toggleTheme = useCallback(function () {
  //     console.log("토글테마 실행");
  //     setTheme((prev) => (prev === "light" ? "dark" : "light"));
  //   }, []);

  //   const value = useMemo(() => ({ user, setUser }), []);

  // 보호 API 호출: 401이면 refresh → 재시도
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
        // refresh 실패 → 세션 정리
        // setAccessToken(null);
        // setUser(null);
        // throw new Error("Failed to refresh");

        setIsLogin(false);
        setUser({});
        setAccessToken(null);
        localStorage.removeItem("AT");
        localStorage.removeItem("ME");
        navigate("/");
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

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    accessToken,
    setAccessToken,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
