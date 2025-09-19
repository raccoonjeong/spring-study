import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Boardlist } from "./components/BoardList";
import { BoardWrite } from "./components/BoardWrite";
import { BoardDetail } from "./components/BoardDetail";
import { Login } from "./components/Login";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-blue-400 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <li>
            <Link
              to="/login"
              className="hover:text-yellow-400 font-semibold transition-colors"
            >
              로그인
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              className="hover:text-yellow-400 font-semibold transition-colors"
            >
              목록
            </Link>
          </li>
          <li>
            <Link
              to="/write"
              className="hover:text-yellow-400 font-semibold transition-colors"
            >
              등록
            </Link>
          </li>
        </ul>
      </nav>

      {/* 라우터 영역 */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/list" element={<Boardlist />}></Route>
          <Route path="/write" element={<BoardWrite />}></Route>
          <Route path="/detail/:num" element={<BoardDetail />}></Route>
          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
