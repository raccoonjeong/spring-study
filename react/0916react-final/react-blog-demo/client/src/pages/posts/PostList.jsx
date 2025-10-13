import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { requestAPI } from "../../api/requestAPI.js";

function PostCard({ post }) {
  const { id, title, category, author_nick } = post;

  return (
    <div>
      <Link to={`/posts/${id}`}>
        {title} / {category} / {author_nick}
      </Link>
    </div>
  );
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async function () {
      try {
        const res = await requestAPI("/posts");
        console.log(res);
        setPosts(res.rows);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post}></PostCard>
      ))}
    </div>
  );
}
