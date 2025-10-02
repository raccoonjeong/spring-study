import { createContext, useContext, useState, memo } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  // 매 렌더링마다 value 객체가 새로 생성됨
  const value = { isAuth, login, logout };
  console.log("AuthProvider 렌더링");

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// memo로 부모 리렌더 시 불필요한 재호출을 회피 (컨텍스트 값이 안 바뀌면 유지)
const Child = memo(function Child() {
  const { isAuth, login, logout } = useContext(AuthContext);
  console.log("Child 렌더링");
  return (
    <div>
      <p>{isAuth ? "로그인됨" : "로그아웃됨"}</p>
      {isAuth ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <button onClick={login}>로그인</button>
      )}
    </div>
  );
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <div className="test">
        <h1>useMemo 없이 쓴 경우</h1>
        <Child />
        <button onClick={() => setCount(count + 1)}>카운트 {count}</button>
      </div>
    </AuthProvider>
  );
}
