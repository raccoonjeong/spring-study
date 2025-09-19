import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function BoardWrite() {
  const navigate = useNavigate();
  const goList = () => {
    navigate("/list");
  };

  const idRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const handleInsert = async () => {
    const formData = {
      inputId: idRef.current.value,
      inputName: nameRef.current.value,
      inputSubject: subjectRef.current.value,
      inputContent: contentRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:8080/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);
      if (data.stus === "fail") {
        alert("등록에 실패");
      }
      if (data.stus === "succ") {
        alert("등록에 성공");
        navigate("/list");
      }
    } catch (e) {
      console.error(e.message);
      alert("등록에 실패");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 등록</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-20 font-medium">이름 :</label>
          <input
            type="text"
            ref={nameRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">아이디 :</label>
          <input
            type="text"
            ref={idRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">제목 :</label>
          <input
            type="text"
            ref={subjectRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-start">
          <label className="w-20 font-medium mt-2">내용 :</label>
          <textarea
            rows="6"
            ref={contentRef}
            className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600 resize-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          className="bg-blue-600 text-white px-5 py-2 border border-blue-600 hover:bg-blue-700"
          onClick={handleInsert}
        >
          등록
        </button>
        <button
          onClick={goList}
          className="bg-green-500 text-white px-5 py-2 hover:bg-green-600"
        >
          목록으로
        </button>
      </div>
    </div>
  );
}
