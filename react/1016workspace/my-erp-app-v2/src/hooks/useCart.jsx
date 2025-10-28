import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const readItems = () => {
    const arr = JSON.parse(localStorage.getItem("cart")) ?? [];
    setItems(arr);
  };

  const addItems = (data) => {
    const key = "cart";

    const existingData = JSON.parse(localStorage.getItem(key)) ?? [];
    localStorage.setItem(key, JSON.stringify([...existingData, data]));
    readItems();
  };

  const value = {
    items,
    countItems: items.length,
    addItems,
  };
  //   const value = useMemo(
  //     () => ({
  //       theme,
  //       toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
  //     }),
  //     [theme]
  //   ); // value 참조 안정화

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
