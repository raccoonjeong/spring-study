import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import ShoppingCart from "@/pages/ShoppingCart";
import NotFound from "@/pages/NotFound";
import GlobalLayout from "@/layouts/GlobalLayout";
import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";
import Store from "@/pages/Store";
/*Sample*/
import SampleCart from "@/samples/SampleCart";
import SampleHome from "@/samples/SampleHome";
import SampleProductDetail from "@/samples/SampleProductDetail";
import SampleProductList from "@/samples/SampleProductList";
import SampleStore from "@/samples/SampleStore";

const router = createBrowserRouter([
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
