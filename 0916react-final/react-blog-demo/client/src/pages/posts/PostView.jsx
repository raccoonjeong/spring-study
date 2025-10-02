import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestAPI } from "../../api/requestAPI.js";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async function () {
      const res = await requestAPI(`/posts/${id}`);
      console.log(res);
      setPost(res);
    };
    fetchPost();
  }, [id]);

  return (
    <div>
      <div>ViewPost </div>
      <div>{post.user_id} </div>
      <div>{post.category} </div>
      <div>{post.title} </div>
      <div>{post.content} </div>
      <div>{post.created_at} </div>
      <div>{post.updated_at} </div>
      <div>{post.author_nick} </div>
      <div>{post.author_email} </div>
    </div>
  );
}
