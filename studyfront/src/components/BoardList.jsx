import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Boardlist() {
  const [board, setBoard] = useState([]);
  const navigate = useNavigate();
  const handleDetail = function (num) {
    navigate(`/detail/${num}`);
  };

  useEffect(() => {
    const boardList = async () => {
      const res = await fetch("http://localhost:8080/list");
      const data = await res.json();
      setBoard(data);
    };
    boardList();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">게시글 목록</h2>
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
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
              key={`board-${b.board_num}`}
              onClick={() => handleDetail(b.board_num)}
            >
              <td className="border border-gray-300 px-4 py-2">
                {b.board_num}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {b.user_name}({b.user_id})
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {b.board_subject}
              </td>
              <td className="border border-gray-300 px-4 py-2">{b.reg_date}</td>
              <td className="border border-gray-300 px-4 py-2">{b.upt_date}</td>
              <td className="border border-gray-300 px-4 py-2">{b.view_cnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
