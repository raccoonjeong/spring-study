import { useParams, useNavigate } from "react-router-dom";
import { getNextStatusByApprove } from "../components/common/commonCode";
import Histories from "../components/approval/Histories";
import Editor from "../components/approval/Editor";

export function ApprovalForm() {
  const navigate = useNavigate();

  const save = async function (item) {
    const { title, content, writerId, statusCode } = item;
    try {
      const status = getNextStatusByApprove(statusCode, user.levelNo);

      if (!confirm(`${status.guideWord}하시겠습니까?`)) {
        return;
      }
      const fetched = await fetchWithAuth("/approval", {
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

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 등록
      </h1>
      <Editor onProcess={save} isEdit={true}></Editor>
      <Histories />
    </div>
  );
}
