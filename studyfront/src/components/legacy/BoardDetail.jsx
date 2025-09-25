import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function BoardDetail() {
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const [isMode, setIsMode] = useState(false);

  const { num } = useParams();
  const [detailData, setDetailData] = useState({});

  const goList = () => {
    navigate("/legacy/list");
  };

  const changeMode = function () {
    setIsMode(true);
  };
  const cancleMode = function () {
    setIsMode(false);
  };
  const handleUpdate = async function () {
    const formData = {
      boardNum: num,
      inputId: idRef.current.value,
      inputName: nameRef.current.value,
      inputSubject: subjectRef.current.value,
      inputContent: contentRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:8080/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);
      if (data.stus === "fail") {
        alert("수정에 실패");
      }
      if (data.stus === "succ") {
        alert("수정에 성공");
        navigate("/legacy/list");
      }
    } catch (e) {
      console.error(e.message);
      alert("수정에 실패");
    }
  };
  const handleDelete = async function () {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }
    const formData = {
      boardNums: [num],
    };
    try {
      const res = await fetch("http://localhost:8080/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);
      if (data.stus === "fail") {
        alert("삭제에 실패");
      }
      if (data.stus === "succ") {
        alert("삭제에 성공");
        navigate("/legacy/list");
      }
    } catch (e) {
      console.error(e.message);
      alert("삭제에 실패");
    }
  };
  useEffect(() => {
    const detail = async () => {
      const res = await fetch(`http://localhost:8080/detail/${num}`);
      const data = await res.json();
      console.log("data", data);
      setDetailData(data);
    };
    detail();
  }, [num]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 등록</h2>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-20 font-medium">이름 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.user_name}
            </span>
          ) : (
            <input
              type="text"
              ref={nameRef}
              defaultValue={detailData.user_name}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">아이디 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.user_id}
            </span>
          ) : (
            <input
              type="text"
              ref={idRef}
              defaultValue={detailData.user_id}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-center">
          <label className="w-20 font-medium">제목 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.board_subject}
            </span>
          ) : (
            <input
              type="text"
              ref={subjectRef}
              defaultValue={detailData.board_subject}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          )}
        </div>

        <div className="flex items-start">
          <label className="w-20 font-medium mt-2">내용 :</label>
          {!isMode ? (
            <span className="flex-1 px-3 py-2 text-left">
              {detailData.board_content}
            </span>
          ) : (
            <textarea
              rows="6"
              ref={contentRef}
              defaultValue={detailData.board_content}
              className="flex-1 border border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-600 resize-none"
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {!isMode ? (
          <>
            <button
              className="bg-yellow-600 text-white px-5 py-2 border border-yellow-600 hover:bg-yellow-700"
              onClick={changeMode}
            >
              수정하기
            </button>
            <button
              className="bg-red-600 text-white px-5 py-2 border border-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-violet-600 text-white px-5 py-2 border border-violet-600 hover:bg-violet-700"
              onClick={handleUpdate}
            >
              수정
            </button>
            <button
              className="bg-orange-600 text-white px-5 py-2 border border-orange-600 hover:bg-orange-700"
              onClick={cancleMode}
            >
              취소
            </button>
          </>
        )}
        <button
          className="bg-green-500 text-white px-5 py-2 hover:bg-green-600"
          onClick={goList}
        >
          목록으로
        </button>
      </div>
    </div>
  );
}
