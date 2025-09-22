import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RestBoardlist() {
  const [board, setBoard] = useState([]);
  const [deleteNums, setDeleteNums] = useState([]);
  const navigate = useNavigate();
  const handleDetail = function (num) {
    navigate(`/rest-detail/${num}`);
  };
  const handleDeleteNums = (num, isChecked) => {
    if (isChecked) {
      setDeleteNums((prev) => (prev.includes(num) ? prev : [...prev, num]));
    }
    if (!isChecked) {
      setDeleteNums((prev) => prev.filter((n) => n !== num));
    }
  };

  const handleDeleteMultiple = async function () {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }
    const formData = {
      boardNums: deleteNums,
    };
    try {
      const res = await fetch("http://localhost:8080/board", {
        method: "DELETE",
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
        boardList();
      }
    } catch (e) {
      console.error(e.message);
      alert("삭제에 실패");
    }
  };
  const boardList = async () => {
    const res = await fetch("http://localhost:8080/board");
    const data = await res.json();
    setBoard(data);
  };

  const checkAll = function (checked) {
    if (checked) {
      setDeleteNums(board.map((b) => b.boardNum));
    }
    if (!checked) {
      setDeleteNums([]);
    }
  };

  const allChecked = board.length === deleteNums.length;

  useEffect(() => {
    boardList();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 목록</h2>
      <div className="flex justify-end">
        <button
          className="bg-red-600 text-white px-5 py-2 border border-red-600 hover:bg-red-700"
          onClick={handleDeleteMultiple}
        >
          선택 삭제
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => checkAll(e.target.checked)}
              />
            </th>
            <th className="border border-gray-300 px-4 py-2">글번호</th>
            <th className="border border-gray-300 px-4 py-2">이름(아이디)</th>
            <th className="border border-gray-300 px-4 py-2">제목</th>
            <th className="border border-gray-300 px-4 py-2">작성일</th>
            <th className="border border-gray-300 px-4 py-2">수정일</th>
            <th className="border border-gray-300 px-4 py-2">조회수</th>
          </tr>
        </thead>
        <tbody>
          {board.map((b) => (
            <tr
              className="hover:bg-gray-200 text-center cursor-pointer"
              key={`board-${b.boardNum}`}
              onClick={() => handleDetail(b.boardNum)}
            >
              <td
                className="border border-gray-300 px-4 py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={deleteNums.includes(b.boardNum)}
                  onChange={(e) =>
                    handleDeleteNums(b.boardNum, e.target.checked)
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{b.boardNum}</td>
              <td className="border border-gray-300 px-4 py-2">
                {b.user_name}({b.userId})
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {b.boardSubject}
              </td>
              <td className="border border-gray-300 px-4 py-2">{b.regDate}</td>
              <td className="border border-gray-300 px-4 py-2">{b.uptDate}</td>
              <td className="border border-gray-300 px-4 py-2">{b.viewCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
