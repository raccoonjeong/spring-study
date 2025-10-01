import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getNextStatusByApprove,
  getNextStatusByReject,
  isPendingApproval,
  isInApproval,
  isApproved,
} from "../common/commonCode";
import { useAuth } from "../hooks/AuthContext";

export function ApprovalDetail() {
  const { num } = useParams();
  const [item, setItem] = useState({});
  const [histories, setHistories] = useState([]);
  const { user } = useAuth();

  const getApprovalItem = async function () {
    const fetched = await fetch(`http://localhost:8080/approval/${num}`);
    const result = await fetched.json();

    if (result.status === "succ") {
      setItem(result.data.item);
      setHistories(result.data.histories);
    }
  };

  const processApproval = async function (getNextStatus) {
    try {
      const nextStatusCode = getNextStatus(item.statusCode, user.levelNo);

      if (!confirm(`${nextStatusCode.guideWord}하시겠습니까?`)) {
        return;
      }
      const fetched = await fetch(
        `http://localhost:8080/approval/process-approval`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            num: num,
            approverId: user.userId,
            statusCode: nextStatusCode.code,
          }),
        }
      );
      const result = await fetched.json();
      if (result.status === "succ") {
        alert(`${nextStatusCode.guideWord}되었습니다.`);
        getApprovalItem();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getApprovalItem();
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* 제목 */}
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 처리
      </h1>

      {/* 결재 상태 선택 (테이블) */}
      <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h2 className="text-base font-semibold text-stone-900">결재 상태</h2>
        </div>

        <div className="overflow-x-auto px-5 py-5">
          <table className="min-w-full border-collapse border border-stone-200 text-center">
            <thead className="bg-stone-50">
              <tr>
                <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                  결재대기
                </th>
                <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                  결재중
                </th>
                <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">
                  결재완료
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-stone-200 px-4 py-4">
                  <input
                    type="checkbox"
                    disabled
                    checked={isPendingApproval(item.statusCode)}
                    className="h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                </td>
                <td className="border border-stone-200 px-4 py-4">
                  <input
                    type="checkbox"
                    disabled
                    checked={isInApproval(item.statusCode)}
                    className="h-5 w-5 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-stone-200 px-4 py-4">
                  <input
                    type="checkbox"
                    disabled
                    checked={isApproved(item.statusCode)}
                    className="h-5 w-5 rounded border-stone-300 text-green-600 focus:ring-green-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 카드: 기본 정보 입력 */}
      <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h2 className="text-base font-semibold text-stone-900">기본 정보</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-5">
          {/* 글번호 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">
              글번호
            </label>
            <input
              type="text"
              value={item.num}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 작성자 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">
              작성자
            </label>
            <input
              type="text"
              value={item.writer}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 제목 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              disabled
              value={item.title}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </div>

          {/* 내용 */}
          <div className="flex items-start gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600 leading-7">
              내용
            </label>
            <textarea
              placeholder="내용을 입력하세요"
              rows={6}
              value={item.content}
              disabled
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="mt-2 flex justify-end gap-2">
            <button className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50">
              취소
            </button>
            <button className="rounded-lg bg-red-900 px-4 py-2 text-sm text-white hover:opacity-90">
              임시저장
            </button>
            <button
              onClick={() => processApproval(getNextStatusByReject)}
              className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              반려
            </button>
            <button
              onClick={() => processApproval(getNextStatusByApprove)}
              className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              결재
            </button>
          </div>
        </div>
      </div>

      {/* 카드: 문서 상태 히스토리 */}
      <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h3 className="text-base font-semibold text-stone-900">문서상태</h3>
        </div>
        <div className="mt-3 pl-5 text-left text-xs text-stone-500 ">
          * 상태는 시간 순서대로 표시됩니다.
        </div>

        <div className="overflow-x-auto px-5 py-5">
          <table className="min-w-full border-collapse">
            <thead className="bg-stone-50">
              <tr className="text-left text-stone-700">
                <th className="px-4 py-3 text-sm font-semibold">번호</th>
                <th className="px-4 py-3 text-sm font-semibold">등록/결재자</th>
                <th className="px-4 py-3 text-sm font-semibold">직급</th>
                <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
              </tr>
            </thead>
            <tbody className="[&>tr:hover]:bg-stone-50">
              {histories ? (
                histories.map((history, index) => (
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{history.procName}</td>
                    <td className="px-4 py-3 text-sm">
                      {history.positionName}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-700 ring-1 ring-stone-200">
                        {history.statusName}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">2</td>
                //   <td className="px-4 py-3 text-sm">김철수</td>
                //   <td className="px-4 py-3 text-sm">사원</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                //       결재대기
                //     </span>
                //   </td>
                // </tr>

                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">3</td>
                //   <td className="px-4 py-3 text-sm">장미라</td>
                //   <td className="px-4 py-3 text-sm">과장</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 ring-1 ring-blue-200">
                //       결재중
                //     </span>
                //   </td>
                // </tr>

                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">4</td>
                //   <td className="px-4 py-3 text-sm">서동욱</td>
                //   <td className="px-4 py-3 text-sm">부장</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-rose-50 px-2 py-1 text-xs text-rose-700 ring-1 ring-rose-200">
                //       반려
                //     </span>
                //   </td>
                // </tr>

                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">5</td>
                //   <td className="px-4 py-3 text-sm">김철수</td>
                //   <td className="px-4 py-3 text-sm">사원</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                //       결재대기
                //     </span>
                //   </td>
                // </tr>

                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">6</td>
                //   <td className="px-4 py-3 text-sm">한소영</td>
                //   <td className="px-4 py-3 text-sm">과장</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                //       결재대기
                //     </span>
                //   </td>
                // </tr>

                // <tr className="border-t border-stone-200">
                //   <td className="px-4 py-3 text-sm">7</td>
                //   <td className="px-4 py-3 text-sm">서동욱</td>
                //   <td className="px-4 py-3 text-sm">부장</td>
                //   <td className="px-4 py-3 text-sm">
                //     <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700 ring-1 ring-emerald-200">
                //       결재완료
                //     </span>
                //   </td>
                // </tr>
                <tr className="border-t border-stone-200">
                  <td colSpan={4} className="px-4 py-3 text-sm text-center">
                    문서 작성중...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
