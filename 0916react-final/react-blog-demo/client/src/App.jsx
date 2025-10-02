import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import PostList from "./pages/posts/PostList.jsx";
import PostView from "./pages/posts/PostView.jsx";
import PostUpdate from "./pages/posts/PostUpdate.jsx";
import PostCreate from "./pages/posts/PostCreate.jsx";
import PostDelete from "./pages/posts/PostDelete.jsx";
import Login from "./pages/auth/Login.jsx";
import Join from "./pages/auth/Join.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />}></Route>
          <Route path="posts/:id" element={<PostView />}></Route>
          <Route path="posts/new" element={<PostCreate />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="join" element={<Join />}></Route>
        </Route>
      </Routes>
      {/* <Posts />
      <hr />
      AuthExample
      <AuthExample />
      <hr />
      UsersExample
      <UsersExample />
      <hr />
      PostsExample
      <PostsExample />
      <hr /> */}
    </>
  );
}
