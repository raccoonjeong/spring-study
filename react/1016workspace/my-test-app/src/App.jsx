import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductList from "./pages/ProductList.jsx";
import TestPage from "./pages/TestPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:category", element: <ProductList /> },
      { path: "products/detail/:id", element: <ProductDetail /> },
      { path: "test", element: <TestPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
