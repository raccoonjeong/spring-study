import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //   const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    // TODO: localStorage 이용 필요
    userId: "",
    empName: "",
    positionCd: "",
  });
  const [isLogin, setIsLogin] = useState(false); // TODO: localStorage 이용 필요

  //   const toggleTheme = useCallback(function () {
  //     console.log("토글테마 실행");
  //     setTheme((prev) => (prev === "light" ? "dark" : "light"));
  //   }, []);

  //   const value = useMemo(() => ({ user, setUser }), []);
  const value = { user, setUser, isLogin, setIsLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
