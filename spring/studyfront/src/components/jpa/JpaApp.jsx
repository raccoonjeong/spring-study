import { NavLink, Outlet } from "react-router-dom";

export function JpaApp() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav className="bg-red-400 text-white px-6 py-3 shadow-md">
        <ul className="flex justify-center space-x-6 text-3xl">
          <li>
            <NavLink
              to="/jpa/list"
              className={({ isActive }) =>
                `hover:text-yellow-400 font-semibold transition-colors ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              글목록
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jpa/write"
              className={({ isActive }) =>
                `hover:text-yellow-400 font-semibold transition-colors ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              글등록
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 라우터 영역 */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
