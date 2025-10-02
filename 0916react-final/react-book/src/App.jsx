import { Navigate, Routes, Route } from "react-router-dom";
import Book from "./pages/Book";
import Test29_1 from "./pages/29/Test1";
import Test29_2 from "./pages/29/Test2";
import Test29_3 from "./pages/29/Test3";
import Test29_4 from "./pages/29/Test4";
import Test30_1 from "./pages/30/Test1";
import Test30_2 from "./pages/30/Test2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/book" replace />} />
      <Route path="/book" element={<Book />} />

      {/* useMemo 예시 */}
      <Route path="/29/test1" element={<Test29_1 />} />
      <Route path="/29/test2" element={<Test29_2 />} />
      {/* useCallback + memo 예시 */}
      <Route path="/29/test3" element={<Test29_3 />} />
      <Route path="/29/test4" element={<Test29_4 />} />
      {/* Context API + useMemo 없을때 */}
      <Route path="/30/test1" element={<Test30_1 />} />
      {/* Context API + useMemo쓴 경우  */}
      <Route path="/30/test2" element={<Test30_2 />} />
    </Routes>
  );
}
