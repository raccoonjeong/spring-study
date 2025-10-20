import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from "@/layouts/GlobalLayout";
import Rewards from "./pages/Rewards";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalLayout />,
      children: [
        // { index: true, element: <Home /> },
        { path: "rewards", element: <Rewards /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
