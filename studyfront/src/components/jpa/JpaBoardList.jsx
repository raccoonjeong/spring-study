import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function JpaBoardList() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const boardList = async () => {
      const res = await fetch("http://localhost:8080/jpa/board");
      const data = await res.json();
      //resdto( list<boarddto> list, pagedto page)
      setBoard(data);
    };

    boardList();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">REST 목록</h2>

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
          {board.length === 0 ? (
            <tr className="hover:bg-gray-200 text-center cursor-pointer">
              <td colSpan={6} className="border border-gray-300 px-4 py-2">
                조회된 데이터가 없습니다.
              </td>
            </tr>
          ) : (
            board.map((data) => (
              <tr
                key={data.boardNum}
                className="hover:bg-gray-200 text-center cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {data.boardNum}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {data.userName}({data.userId})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.boardSubject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.regDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.uptDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.viewCnt}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
