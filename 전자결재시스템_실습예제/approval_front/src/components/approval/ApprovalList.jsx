import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export function ApprovalList() {
  const [approvalItems, setApprovalItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getApprovalItems = async function () {
    const fetched = await fetch("http://localhost:8080/approval");
    const result = await fetched.json();

    if (result.status === "succ") {
      setApprovalItems(result.data);
    }
  };

  const goDetail = function (num) {
    navigate(`/detail/${num}`);
  };

  useEffect(() => {
    getApprovalItems();
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
              approvalItems.map((item) => (
                <tr
                  className="border-t border-stone-200"
                  onClick={() => goDetail(item.num)}
                >
                  <td className="px-4 py-3">{item.num}</td>
                  <td className="px-4 py-3">{item.writer}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.regDate}</td>
                  <td className="px-4 py-3">{item.approver || "-"}</td>
                  <td className="px-4 py-3">{item.apprDate || "-"}</td>
                  <td className="px-4 py-3 text-stone-700">
                    {item.statusName}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t border-stone-200">
                <td className="px-4 py-3" colSpan="7">
                  내용이 없습니다.
                </td>
              </tr>
            )}

            {/* <tr className="border-t border-stone-200">
              <td className="px-4 py-3">3</td>
              <td className="px-4 py-3">최지훈</td>
              <td className="px-4 py-3">법인카드 한도 증액 요청</td>
              <td className="px-4 py-3">2025-09-03</td>
              <td className="px-4 py-3">2025-09-04</td>
              <td className="px-4 py-3">장미라(과장)</td>
              <td className="px-4 py-3 text-blue-600">결재중</td>
            </tr>

            <tr className="border-t border-stone-200">
              <td className="px-4 py-3">4</td>
              <td className="px-4 py-3">윤아름</td>
              <td className="px-4 py-3">교육비 지원 신청</td>
              <td className="px-4 py-3">2025-09-05</td>
              <td className="px-4 py-3">2025-09-06</td>
              <td className="px-4 py-3">서동욱(부장)</td>
              <td className="px-4 py-3 text-emerald-600">결재완료</td>
            </tr>

            <tr className="border-t border-stone-200">
              <td className="px-4 py-3">5</td>
              <td className="px-4 py-3">박민수</td>
              <td className="px-4 py-3">야근식대 비용 처리</td>
              <td className="px-4 py-3">2025-09-07</td>
              <td className="px-4 py-3">2025-09-08</td>
              <td className="px-4 py-3">한지섭(과장)</td>
              <td className="px-4 py-3 text-rose-600">반려</td>
            </tr> */}
          </tbody>

          <tfoot className="bg-white border-t border-stone-200">
            <tr>
              <td colSpan={7} className="px-4 py-3 text-center text-sm">
                [이전] 1 2 3 4 5 [다음]
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
