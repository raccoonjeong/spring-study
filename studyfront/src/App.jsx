import { Link, NavLink, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import { BoardList } from "./components/legacy/BoardList";
import { BoardWrite } from "./components/legacy/BoardWrite";
import { BoardDetail } from "./components/legacy/BoardDetail";
import { Login } from "./components/legacy/Login";
import { RestBoardList } from "./components/rest/RestBoardList";
import { RestBoardDetail } from "./components/rest/RestBoardDetail";
import { RestBoardWrite } from "./components/rest/RestBoardWrite";

import { JpaBoardList } from "./components/jpa/JpaBoardList";
import { JpaBoardDetail } from "./components/jpa/JpaBoardDetail";
import { JpaBoardWrite } from "./components/jpa/JpaBoardWrite";

import Welcome from "./components/Welcome";
import { LegacyApp } from "./components/legacy/LegacyApp";
import { RestApp } from "./components/rest/RestApp";
import { JpaApp } from "./components/jpa/JpaApp";

function App() {
  return (
    <div className="font-serif">
      {/* 네비게이션 바 */}
      <nav className="bg-green-400 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <li>
            <NavLink
              to="/legacy"
              className={({
                isActive,
              }) => `hover:text-yellow-400 font-semibold transition-colors
                ${isActive ? "text-orange-500" : ""}`}
            >
              Legacy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rest"
              className={({
                isActive,
              }) => `hover:text-yellow-400 font-semibold transition-colors
                ${isActive ? "text-violet-500" : ""}`}
            >
              REST
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jpa"
              className={({
                isActive,
              }) => `hover:text-yellow-400 font-semibold transition-colors
                ${isActive ? "text-red-500" : ""}`}
            >
              JPA
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 라우터 영역 */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="legacy" element={<LegacyApp />}>
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<BoardList />}></Route>
            <Route path="write" element={<BoardWrite />}></Route>
            <Route path="detail/:num" element={<BoardDetail />}></Route>
          </Route>

          <Route path="rest" element={<RestApp />}>
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<RestBoardList />}></Route>
            <Route path="write" element={<RestBoardWrite />}></Route>
            <Route path="detail/:num" element={<RestBoardDetail />}></Route>
          </Route>

          <Route path="jpa" element={<JpaApp />}>
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<JpaBoardList />}></Route>
            <Route path="write" element={<JpaBoardWrite />}></Route>
            <Route path="detail/:num" element={<JpaBoardDetail />}></Route>
          </Route>

          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
