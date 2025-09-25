import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function RestBoardList() {
  const [board, setBoard] = useState([]);
  const [page, setPage] = useState({});
  const [pageBlock, setPageBlock] = useState([]);
  const [deleteNums, setDeleteNums] = useState([]);

  const searchTypeRef = useRef(null);
  const searchKeywordRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const navigate = useNavigate();
  const handleDetail = function (num) {
    navigate(`/rest/detail/${num}`);
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

    try {
      const res = await fetch("http://localhost:8080/board", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteNums),
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
    setBoard(data.list);
    pageSetting(data.page);
  };

  const pageSetting = (page) => {
    setPage(page);
    const arr = [];
    for (let p = page.blockStart; p <= page.blockEnd; p++) {
      arr.push(p);
    }
    setPageBlock(arr);
  };

  const checkAll = function (checked) {
    if (checked) {
      setDeleteNums(board.map((b) => b.boardNum));
    }
    if (!checked) {
      setDeleteNums([]);
    }
  };

  const handleSearch = async function (page) {
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    const formData = {
      searchType: searchTypeRef.current.value,
      searchKeyword: searchKeywordRef.current.value,
      startDate: startDate,
      endDate: endDate,
      curPage: page,
      pageSize: 5,
    };

    // if ((startDate && !endDate) || (!startDate && endDate)) {
    if (Boolean(startDate) !== Boolean(endDate)) {
      alert("시작일 종료일 모두 입력하세요");
      return;
    }

    const res = await fetch("http://localhost:8080/board/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setBoard(data.list);
    pageSetting(data.page);
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
          {board.length === 0 ? (
            <tr className="hover:bg-gray-200 text-center cursor-pointer">
              <td colSpan={7} className="border border-gray-300 px-4 py-2">
                조회된 데이터가 없습니다.
              </td>
            </tr>
          ) : (
            board.map((b) => (
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
                <td className="border border-gray-300 px-4 py-2">
                  {b.boardNum}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {b.userName}({b.userId})
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {b.boardSubject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {b.regDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {b.uptDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {b.viewCnt}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-center space-x-3 py-5">
        {page.blockStart > 1 && (
          <span
            className="border border-gray-400 px-3 py-1 hover:bg-violet-200 cursor-pointer rounded-sm"
            onClick={() => handleSearch(page.blockStart - 1)}
          >
            이전
          </span>
        )}
        {pageBlock.map((p, i) => (
          <span
            key={i}
            className={`border border-gray-400 px-3 py-1 hover:bg-violet-200 cursor-pointer rounded-sm ${
              p === page.curPage ? "bg-violet-300" : ""
            }`}
            onClick={() => handleSearch(p)}
          >
            {p}
          </span>
        ))}
        {page.blockEnd < page.totalPages && (
          <span
            className="border border-gray-400 px-3 py-1 hover:bg-violet-200 cursor-pointer rounded-sm"
            onClick={() => handleSearch(page.blockEnd + 1)}
          >
            다음
          </span>
        )}
      </div>
      <div className="space-y-3 mt-10">
        {/* 검색 조건 */}
        <div className="flex justify-center items-center gap-2">
          <select
            className="border border-gray-400 rounded px-2 py-2 focus:outline-none focus:border-blue-600"
            ref={searchTypeRef}
          >
            <option value="all">전 체</option>
            <option value="name">작성자</option>
            <option value="subject">제목</option>
            <option value="subjectContent">제목+내용</option>
          </select>

          <input
            type="text"
            ref={searchKeywordRef}
            placeholder="검색어 입력"
            className="flex border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />

          <button
            onClick={() => handleSearch(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {/* 날짜 검색 */}
        <div className="flex justify-center items-center gap-2">
          <input
            type="date"
            ref={startDateRef}
            placeholder="시작일"
            className="w-40 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />
          <span>~</span>
          <input
            type="date"
            ref={endDateRef}
            placeholder="종료일"
            className="w-40 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
