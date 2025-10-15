import { products as bestProducts } from "./data_best.js";
import { products as newProducts } from "./data_new.js";
import { products as womenProducts } from "./data_women.js";
import { products as menProducts } from "./data_men.js";
import { products as kidsProducts } from "./data_kids.js";

womenProducts.map((p) => {
  return { ...p, category: "women" };
});
menProducts.map((p) => {
  return { ...p, category: "women" };
});
kidsProducts.map((p) => {
  return { ...p, category: "women" };
});
bestProducts.map((p) => {
  return { ...p, category: "women" };
});
newProducts.map((p) => {
  return { ...p, category: "women" };
});

export const getProductByCategory = function (category) {
  switch (category) {
    case "women":
      return womenProducts;
    case "men":
      return menProducts;
    case "kids":
      return kidsProducts;
    case "best":
      return bestProducts;
    case "new":
      return newProducts;
    default:
      console.warn(`Unknown category: ${category}`);
      return [];
  }
};
