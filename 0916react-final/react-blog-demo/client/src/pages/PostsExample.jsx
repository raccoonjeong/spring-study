import { useEffect, useState } from "react";
import { requestAPI } from "../api/requestAPI";

export default function PostsExample() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  async function fetchPosts() {
    const res = await requestAPI("/posts");
    setPosts(res.rows);
  }

  async function createPost() {
    await requestAPI("/posts", {
      method: "POST",
      data: { category, title, content },
    });
    fetchPosts();
  }

  async function updatePost(id) {
    await requestAPI(`/posts/${id}`, {
      method: "PUT",
      data: {
        category: "Updated",
        title: "수정된 제목",
        content: "수정된 본문",
      },
    });
    fetchPosts();
  }

  async function deletePost(id) {
    await requestAPI(`/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4 ">
      <h2>게시글 작성</h2>
      <input
        placeholder="카테고리"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createPost}>작성</button>

      <h2>게시글 목록</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>
              [{p.category}] {p.title}
            </strong>{" "}
            - {p.author_nick}
            <button onClick={() => updatePost(p.id)}>수정</button>
            <button onClick={() => deletePost(p.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
