import { useNavigate } from "react-router-dom";
import {
  getNextStatusByApprove,
  getNextStatusByReject,
} from "../common/commonCode";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

export default function Editor({
  itemProps,
  isEdit = false,
  isRejected = false,
  onProcess,
}) {
  const [item, setItem] = useState({
    title: "",
    content: "",
    writer: "",
    statusCode: "-",
    num: "",
  });
  const { user, fetchWithAuth } = useAuth();
  const navigate = useNavigate();

  const setBasicInfo = async function () {
    const fetched = await fetchWithAuth("/approval/nextval");
    const result = await fetched.json();
    if (result.status === "succ") {
      setItem((prev) => ({ ...prev, num: result.data, writer: user.empName }));
    }
  };

  const setStateByName = function (e) {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const goBack = function () {
    navigate(-1);
  };

  useEffect(() => {
    if (!isEdit) {
      setItem(itemProps);
    }
    if (isEdit) {
      setBasicInfo();
    }
  }, [itemProps]);

  return (
    <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-3">
        <h2 className="text-base font-semibold text-stone-900">기본 정보</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 py-5">
        {/* 글번호 */}
        <div className="flex items-center gap-4">
          <label className="w-28 shrink-0 text-sm text-stone-600">글번호</label>
          <input
            type="text"
            value={item.num}
            disabled={true}
            className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
          />
        </div>
        {/* 작성자 */}
        <div className="flex items-center gap-4">
          <label className="w-28 shrink-0 text-sm text-stone-600">작성자</label>
          <input
            type="text"
            value={item.writer}
            name="writer"
            disabled={true}
            className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
          />
        </div>
        {/* 제목 */}
        <div className="flex items-center gap-4">
          <label className="w-28 shrink-0 text-sm text-stone-600">제목</label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            disabled={!isEdit && !isRejected}
            value={item.title}
            name="title"
            onChange={setStateByName}
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
            name="content"
            onChange={setStateByName}
            disabled={!isEdit && !isRejected}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
          ></textarea>
        </div>
        {/* 버튼 */}
        {!isEdit && !isRejected && (
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
              onClick={goBack}
            >
              취소
            </button>
            {user.levelNo >= 3 && (
              <>
                <button
                  onClick={() => onProcess({ ...item, action: "REJECT" })}
                  className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90"
                >
                  반려
                </button>
                <button
                  onClick={() => onProcess({ ...item, action: "APPROVE" })}
                  className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
                >
                  결재
                </button>
              </>
            )}
          </div>
        )}

        {!isEdit && isRejected && (
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
              onClick={goBack}
            >
              취소
            </button>
            <button
              onClick={() =>
                onProcess({ ...item, action: "APPROVE" }, isRejected)
              }
              className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              결재
            </button>
          </div>
        )}

        {isEdit && (
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
              onClick={goBack}
            >
              취소
            </button>
            <button
              className="rounded-lg bg-red-900 px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={() => onProcess({ ...item, statusCode: "-" })}
            >
              임시저장
            </button>
            <button
              className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
              onClick={() => onProcess({ ...item, statusCode: "TMP" })}
            >
              결재
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
