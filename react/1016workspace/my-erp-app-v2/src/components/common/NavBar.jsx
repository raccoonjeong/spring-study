import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShoppingCart, Search, Bell, User } from "lucide-react";

function Badge({ value = 0 }) {
  if (!value || value <= 0) return null;
  const text = value > 99 ? "99+" : String(value); // Badge(최대 99+)
  return (
    <span
      className="pointer-events-none absolute top-0 -right-1 min-w-[16px] h-[16px] px-1
                     rounded-full font-semibold text-[10px] leading-[16px] text-white text-center
                     bg-red-500 shadow ring-1 ring-white"
    >
      {text}
    </span>
  );
}

function resolveIcon(name = "cart") {
  const size = 20;
  const map = {
    cart: <ShoppingCart size={size} />,
    search: <Search size={size} />,
    bell: <Bell size={size} />,
    user: <User size={size} />,
  };
  return map[name] ?? <ShoppingCart size={size} />;
}

function IconItem({ to, onClick, badge = 0, icon = "cart" }) {
  const base =
    "relative inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-stone-100";
  if (onClick && !to) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={base}
        aria-label={icon}
      >
        {resolveIcon(icon)}
        <Badge value={badge} />
      </button>
    );
  }
  return (
    <NavLink
      to={to ?? "#"}
      className={({ isActive }) =>
        cn(base, isActive && "bg-purple-100 text-purple-600")
      }
      end
      aria-label={icon}
    >
      {resolveIcon(icon)}
      <Badge value={badge} />
    </NavLink>
  );
}

function TextItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "font-semibold px-3 py-1.5 rounded-lg transition-color duration-500 ",
          isActive ? "text-purple-600 bg-purple-100" : ""
        )
      }
      end
    >
      {children}
    </NavLink>
  );
}

export function NavItem({ item }) {
  const { title, url, type = "text", icon, badge, func } = item ?? {};
  if (type === "icon")
    return <IconItem to={url} onClick={func} icon={icon} badge={badge} />;
  if (type === "custom") return item.element ?? null;
  return <TextItem to={url}>{title}</TextItem>;
}

export default function NavBar({ navItems = [] }) {
  const left = navItems.filter((i) => (i?.align ?? "left") !== "right");
  const right = navItems.filter((i) => (i?.align ?? "left") === "right");

  return (
    <nav className="h-full flex items-center justify-between">
      <div className="flex items-center gap-1">
        {left.map((item, idx) => (
          <NavItem
            key={item.url || item.title || item.icon || `l-${idx}`}
            item={item}
          />
        ))}
      </div>
      <div className="flex items-center gap-1">
        {right.map((item, idx) => (
          <NavItem
            key={item.url || item.title || item.icon || `r-${idx}`}
            item={item}
          />
        ))}
      </div>
    </nav>
  );
}
