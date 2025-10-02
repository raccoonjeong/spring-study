import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export function ApprovalList() {
  const [approvalItems, setApprovalItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState({});
  const [pageBlock, setPageBlock] = useState([]);

  const getApprovalItems = async function (curPage = 1, pageSize = 10) {
    const fetched = await fetch(
      `http://localhost:8080/approval?curPage=${curPage}&pageSize=${pageSize}`
    );
    const result = await fetched.json();

    if (result.status === "succ") {
      setApprovalItems(result.data.items);
      setPage(result.data.curPage);
      pageSetting({
        blockEnd: result.data.blockEnd,
        blockSize: result.data.blockSize,
        blockStart: result.data.blockStart,
        count: result.data.count,
        curPage: result.data.curPage,
        currentBlock: result.data.currentBlock,
        totalPages: result.data.totalPages,
      });
    }
  };

  const pageSetting = (page) => {
    setPage(page);
    const arr = [];
    for (let p = page.blockStart; p <= page.blockEnd; p++) {
      arr.push(p);
    }
    setPageBlock(arr);
  };

  const goDetail = function (num) {
    navigate(`/detail/${num}`);
  };

  const getColorByStatus = function (status) {
    switch (status) {
      case "TMP":
        return "text-stone-700";
      case "PND":
        return "text-amber-600";
      case "APR":
        return "text-blue-600";
      case "CMP":
        return "text-emerald-600";
      case "REJ":
        return "text-rose-600";
      default:
        return "text-stone-700";
    }
  };

  useEffect(() => {
    getApprovalItems(1);
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] p-6">
      {/* 환영 메세지 (왼쪽 정렬) */}
      <div className="mb-4 text-sm text-stone-600 text-left">
        <span className="font-semibold text-stone-800">
          {user.empName}({user.positionName})
        </span>
        님 환영합니다.
      </div>

      {/* h1 (가운데 정렬) */}
      <h1 className="text-2xl font-bold text-stone-900 mb-4 text-center">
        결재 목록
      </h1>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-stone-50">
            <tr className="text-stone-700">
              <th className="px-4 py-3 text-sm font-semibold">글번호</th>
              <th className="px-4 py-3 text-sm font-semibold">작성자</th>
              <th className="px-4 py-3 text-sm font-semibold">제목</th>
              <th className="px-4 py-3 text-sm font-semibold">등록일</th>
              <th className="px-4 py-3 text-sm font-semibold">결재일</th>
              <th className="px-4 py-3 text-sm font-semibold">결재자</th>
              <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
            </tr>
          </thead>

          <tbody className="[&>tr:hover]:bg-stone-50 text-center">
            {approvalItems.length > 0 ? (
              approvalItems.map((item, index) => (
                <tr
                  className="border-t border-stone-200"
                  onClick={() => goDetail(item.num)}
                  key={index}
                >
                  <td className="px-4 py-3">{item.rowNum}</td>
                  <td className="px-4 py-3">{item.writer}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.regDate}</td>
                  <td className="px-4 py-3">{item.apprDate || "-"}</td>
                  <td className="px-4 py-3">
                    {item.approver
                      ? `${item.approver}(${item.approverPositionName})`
                      : "-"}
                  </td>
                  <td
                    className={`px-4 py-3 ${getColorByStatus(item.statusCode)}`}
                  >
                    {item.statusName}
                  </td>
                  {/* 컬ㄹ러 참고용!! 
                  <td className="px-4 py-3 text-stone-700">임시저장</td> 
                  <td className="px-4 py-3 text-amber-600">결재대기</td>
                  <td className="px-4 py-3 text-blue-600">결재중</td>
                  <td className="px-4 py-3 text-emerald-600">결재완료</td>
                  <td className="px-4 py-3 text-rose-600">반려</td>
                  */}
                </tr>
              ))
            ) : (
              <tr className="border-t border-stone-200">
                <td className="px-4 py-3" colSpan="7">
                  내용이 없습니다.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="bg-white border-t border-stone-200">
            <tr>
              <td colSpan={7} className="px-4 py-3 text-center text-sm">
                <div className="flex justify-center space-x-3 py-5">
                  {page.blockStart > 1 && (
                    <span
                      className="border border-gray-400 px-3 py-1 hover:bg-violet-200 cursor-pointer rounded-sm"
                      onClick={() => getApprovalItems(page.blockStart - 1)}
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
                      onClick={() => getApprovalItems(p)}
                    >
                      {p}
                    </span>
                  ))}
                  {page.blockEnd < page.totalPages && (
                    <span
                      className="border border-gray-400 px-3 py-1 hover:bg-violet-200 cursor-pointer rounded-sm"
                      onClick={() => getApprovalItems(page.blockEnd + 1)}
                    >
                      다음
                    </span>
                  )}
                </div>
                {/* [이전] 1 2 3 4 5 [다음] */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
