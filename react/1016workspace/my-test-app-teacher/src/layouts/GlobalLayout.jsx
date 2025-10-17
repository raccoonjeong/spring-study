import { Outlet, Link } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div>
      <nav className="p-4 border-b flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">All</Link>
        <Link to="/products/women">Women</Link>
        <Link to="/products/men">Men</Link>
        <Link to="/products/kids">Kids</Link>
        <Link to="/products/new">New</Link>
        <Link to="/products/best">Best</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
