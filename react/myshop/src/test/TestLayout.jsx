import { Outlet } from "react-router-dom";
import TestHeader from "./TestHeader";

export default function TestLayout() {
  return (
    <div>
      <TestHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
