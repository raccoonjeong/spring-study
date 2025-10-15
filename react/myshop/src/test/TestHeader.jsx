import { Link } from "react-router-dom";

function NavItem({ path, children }) {
  return (
    <Link to={path} className="hover:text-purple-500 hover:underline">
      {children}
    </Link>
  );
}
export default function TestHeader() {
  return (
    <div className="border-b flex space-x-4 p-4">
      <NavItem path="/test">로고</NavItem>
      <NavItem path="/test/women">Women</NavItem>
      <NavItem path="/test/men">Men</NavItem>
      <NavItem path="/test/kids">Kids</NavItem>
      <NavItem path="/test/new">New</NavItem>
      <NavItem path="/test/best">Best</NavItem>
      <div className="flex-grow"></div>
      <NavItem path="/test/cart">장바구니</NavItem>
    </div>
  );
}
