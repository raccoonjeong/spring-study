import React, { Suspense, lazy } from "react"; // Suspense: 로딩중화면 보여주기
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import GlobalLayout from "@/layouts/GlobalLayout";
import TestList from "./test/TestList";
import TestDetail from "./test/TestDetail";
import TestLayout from "./test/TestLayout";

const ShoppingCart = lazy(() => import("@/pages/ShoppingCart"));
const ProductList = lazy(() => import("@/pages/ProductList"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Store = lazy(() => import("@/pages/Store"));

/*Sample*/
import SampleCart from "@/samples/SampleCart";
import SampleHome from "@/samples/SampleHome";
import SampleProductDetail from "@/samples/SampleProductDetail";
import SampleProductList from "@/samples/SampleProductList";
import SampleStore from "@/samples/SampleStore";

const router = createBrowserRouter([
  {
    path: "test",
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: <TestList />,
      },
      {
        path: ":category",
        element: <TestList />,
      },
      {
        path: "list",
        element: <TestList />,
      },
      {
        path: "detail/:id",
        element: <TestDetail />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products/:category", element: <ProductList /> },
      { path: "products/detail/:id", element: <ProductDetail /> },
      { path: "shopping/cart", element: <ShoppingCart /> },
      { path: "store", element: <Store /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
/**
 * const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
 * 위 코드는 아래와 똑같음
 * <BrowserRouter>
 *   <Routes>
 *    <Route path="/" element={<Home/>}>
 *   <Routes>
 * </BrowserRouter>
 */

function NowLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full p-6">
      로딩중....
    </div>
  );
}
function App() {
  return (
    <Suspense fallback={<NowLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
