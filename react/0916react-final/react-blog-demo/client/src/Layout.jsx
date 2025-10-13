import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";

export default function Layout() {
  const { memo, me } = useAuth();
  return (
    <div>
      <header className="sticky top-0">
        <nav className="flex space-x-3">
          {" "}
          {memo}
          <Link to="/">Posts</Link>
          <Link to="/posts/new">Create</Link>
          <Link to="/posts/1">1번글</Link>
          <Link to="/posts/2">2번글</Link>
          {me ? (
            <>
              {me.nick}님 환영합니다.<button>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/join">회원가입</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
