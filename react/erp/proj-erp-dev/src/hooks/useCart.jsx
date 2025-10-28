import { createContext, useContext } from "react";
import { useState } from "react";

const CartContext = createContext(null);

function readCart() {
  const str = localStorage.getItem("shopping-cart");
  if (!str) return [];
  return JSON.parse(str);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCart());

  const addItem = (newItem) => {
    /*
    const cartKey = "shopping-cart";
    const str = localStorage.getItem(cartKey); //문자열
    console.log("str", str);
    const arr = str ? JSON.parse(str) : [];
    console.log("arr prev", arr);
    const data = [
      ...arr,
      {
        id,
        title: product?.title,
        price: product?.price,
        size: selectedSize,
        count,
      },
    ];
    localStorage.setItem(cartKey, JSON.stringify(data));
    console.log("data ", data);
    */
  };

  const deleteItem = () => {
    // setItems()
  };
  const value = {
    items,
    count: items.length,
    addItem,
    deleteItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default function useCart() {
  const ctx = useContext(CartContext);
  return ctx;
}
