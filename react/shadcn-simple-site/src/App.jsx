import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout.jsx";
import ShadcnSimpleSite from "./pages/ShadcnSimpleSite.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [{ index: true, element: <ShadcnSimpleSite /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
