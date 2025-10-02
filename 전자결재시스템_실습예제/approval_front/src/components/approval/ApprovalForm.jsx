import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/AuthContext";
import { getNextStatusByApprove } from "../common/commonCode";

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
  const save = async function (code) {
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const writerId = user.userId;
    try {
      const status = getNextStatusByApprove(code, user.levelNo);

      if (!confirm(`${status.guideWord}하시겠습니까?`)) {
        return;
      }
      const fetched = await fetch("http://localhost:8080/approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          writerId,
          statusCode: status.code,
        }),
      });
      const result = await fetched.json();
      if (result.status === "succ") {
        alert(`${status.guideWord}되었습니다.`);
        navigate("/list");
      }
    } catch (err) {
      alert(err.message);
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
              onClick={() => save("-")}
            >
              임시저장
            </button>
            <button className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90">
              반려
            </button>
            <button
              className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={() => save("TMP")}
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
              <tr className="border-t border-stone-200">
                <td colSpan={4} className="px-4 py-3 text-sm text-center">
                  문서 작성중...
                </td>
              </tr>
            </tbody>
          </table>

          {/* 컬ㄹ러 참고용!! 
          <tr className="border-t border-stone-200">
                <td colSpan={4} className="px-4 py-3 text-sm text-center">
                  문서 작성중...
                </td>
              </tr>
              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">1</td>
                <td className="px-4 py-3 text-sm">김철수</td>
                <td className="px-4 py-3 text-sm">사원</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-700 ring-1 ring-stone-200">
                    임시저장
                  </span>
                </td>
              </tr>


              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">2</td>
                <td className="px-4 py-3 text-sm">김철수</td>
                <td className="px-4 py-3 text-sm">사원</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                    결재대기
                  </span>
                </td>
              </tr>

              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">3</td>
                <td className="px-4 py-3 text-sm">장미라</td>
                <td className="px-4 py-3 text-sm">과장</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 ring-1 ring-blue-200">
                    결재중
                  </span>
                </td>
              </tr>

              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">4</td>
                <td className="px-4 py-3 text-sm">서동욱</td>
                <td className="px-4 py-3 text-sm">부장</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-rose-50 px-2 py-1 text-xs text-rose-700 ring-1 ring-rose-200">
                    반려
                  </span>
                </td>
              </tr>

              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">5</td>
                <td className="px-4 py-3 text-sm">김철수</td>
                <td className="px-4 py-3 text-sm">사원</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                    결재대기
                  </span>
                </td>
              </tr>

              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">6</td>
                <td className="px-4 py-3 text-sm">한소영</td>
                <td className="px-4 py-3 text-sm">과장</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 ring-1 ring-amber-200">
                    결재대기
                  </span>
                </td>
              </tr>

              <tr className="border-t border-stone-200">
                <td className="px-4 py-3 text-sm">7</td>
                <td className="px-4 py-3 text-sm">서동욱</td>
                <td className="px-4 py-3 text-sm">부장</td>
                <td className="px-4 py-3 text-sm">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700 ring-1 ring-emerald-200">
                    결재완료
                  </span>
                </td>
              </tr> */}
        </div>
      </div>
    </div>
  );
}
