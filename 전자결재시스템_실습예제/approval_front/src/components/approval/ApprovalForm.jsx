import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/AuthContext";

export function ApprovalForm() {
  const navigate = useNavigate();
  const [nextVal, setNextVal] = useState(0);
  const { user } = useAuth();

  const titleRef = useRef("");
  const contentRef = useRef("");

  const getNextNumber = async function () {
    const fetched = await fetch("http://localhost:8080/approval/nextval");
    const result = await fetched.json();
    if (result.status === "succ") {
      setNextVal(result.data);
    }
  };
  const temporalSave = async function () {
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const writerId = user.userId;
    const statusCode = "TMP"; // TODO: 임시
    // new ApprovalHistoryDTO(approvalNum, item.getWriterId(), item.getStatusCode());

    const fetched = await fetch("http://localhost:8080/approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, writerId, statusCode }),
    });
    const result = await fetched.json();
    if (result.status === "succ") {
      alert("임시저장되었습니다.");
      navigate("/list");
    }
  };

  useEffect(() => {
    getNextNumber();
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* 제목 */}
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 등록
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
                    checked
                    className="h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                </td>
                <td className="border border-stone-200 px-4 py-4">
                  <input
                    type="checkbox"
                    disabled
                    checked
                    className="h-5 w-5 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-stone-200 px-4 py-4">
                  <input
                    type="checkbox"
                    disabled
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
              value={nextVal}
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
              value={user.empName}
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
              ref={titleRef}
              name="title"
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
              ref={contentRef}
              name="content"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="mt-2 flex justify-end gap-2">
            <button className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50">
              취소
            </button>
            <button
              className="rounded-lg bg-red-900 px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={temporalSave}
            >
              임시저장
            </button>
            <button className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90">
              반려
            </button>
            <button className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90">
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
              <tr className="border-t border-stone-200">
                <td colSpan={4} className="px-4 py-3 text-sm text-center">
                  문서 작성중...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
