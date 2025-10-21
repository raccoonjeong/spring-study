import { Outlet, Link } from "react-router-dom";
export default function GlobalLayout() {
  return (
    <div>
      <nav className="p-4 border-b flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/mgr/product">상품관리</Link>
        <Link to="/mgr/store">매장관리</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
