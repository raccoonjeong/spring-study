import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function NavItem({ url, children }) {
  console.log("url", url);
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        cn(
          "px-2 py-1 transition-color delay-50 duration-300 easy-in-out",
          isActive ? "bg-purple-200" : ""
        )
      }
    >
      {children}
    </NavLink>
  );
}
