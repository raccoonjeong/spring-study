import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ApprovalList } from "./pages/ApprovalList";
import { ApprovalForm } from "./pages/ApprovalForm";
import { ApprovalDetail } from "./pages/ApprovalDetail";
import { Login } from "./components/login/Login";
import { Home } from "./components/main/home";
import { useAuth } from "./hooks/AuthContext";

function App() {
  const { isLogin, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <div>
        <nav className="bg-gray-600 text-white px-6 py-3 shadow-md">
          <ul className="flex justify-center space-x-6 text-3xl">
            {!isLogin ? (
              <>
                <li
                  onClick={() => setShowLogin(true)}
                  className="cursor-pointer"
                >
                  로그인
                </li>
              </>
            ) : (
              <>
                <li onClick={logout}>로그아웃</li>
                <li>
                  <Link to="/list">결재목록</Link>
                </li>
                <li>
                  <Link to="/save">결재등록</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/list" element={<ApprovalList />}></Route>
          <Route path="/save" element={<ApprovalForm />}></Route>
          <Route path="/detail/:num" element={<ApprovalDetail />}></Route>
          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>

      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
    </div>
  );
}

export default App;
