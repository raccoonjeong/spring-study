import { useState } from "react";
import { requestAPI } from "../../api/requestAPI.js";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategoty] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // category
  // title
  // content
  const createPost = async function () {
    if (!category || !title || !content) {
      alert(" 다 입력하세ㅐ요");
      return;
    }
    const data = {
      title,
      category,
      content,
    };
    try {
      const res = await requestAPI("/posts", { method: "POST", data: data });
      console.log("글 등록", res);
      if (!res?.id) {
        throw Error("글 등록에 실패하였습니다.");
      }
      alert("글 등록 성공!");
      navigate(`/posts/${res.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1>Post Create</h1>
      <div>
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        {" "}
        <label>
          {" "}
          카테고리
          <input
            type="text"
            value={category}
            onChange={(e) => setCategoty(e.target.value)}
          />
        </label>
      </div>
      <div>
        {" "}
        <label>
          {" "}
          내용
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div>
        <button onClick={createPost}>등록하기</button>
      </div>
    </div>
  );
}
