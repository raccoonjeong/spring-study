import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import Histories from "../components/approval/Histories";
import Status from "../components/approval/Status";
import Editor from "../components/approval/Editor";
import {
  getNextStatusByApprove,
  getNextStatusByReject,
} from "../components/common/commonCode.js";

export function ApprovalDetail() {
  const navigate = useNavigate();
  const { user, fetchWithAuth, isLogin } = useAuth();

  const { num } = useParams();
  const [item, setItem] = useState({
    title: "",
    content: "",
    writer: "",
    statusCode: "-",
    num: "",
  });
  const [isRejected, setIsRejected] = useState(false);
  const [histories, setHistories] = useState([]);

  const getApprovalItem = async function () {
    try {
      const fetched = await fetchWithAuth(`/approval/${num}`);
      const result = await fetched.json();

      if (result.status === "succ") {
        setItem(result.data.item);
        setIsRejected(result.data.item.statusCode === "REJ");
        setHistories(result.data.histories);
      }
      if (result.status === "fail") {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
      navigate(-1, { replace: true }); // 뒤로가기
    }
  };

  const process = async function (
    { title, content, statusCode, action },
    isRejected = false
  ) {
    try {
      debugger;
      const nextStatusCode =
        action === "REJECT"
          ? getNextStatusByReject(statusCode, user.levelNo)
          : getNextStatusByApprove(statusCode, user.levelNo);

      if (!confirm(`${nextStatusCode.guideWord}하시겠습니까?`)) {
        return;
      }
      const fetched = await fetchWithAuth(`/approval`, {
        method: isRejected ? "PUT" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRejected
            ? {
                num: num,
                title,
                content,
              }
            : {
                num: num,
                action,
                approverId: user.userId,
                statusCode: nextStatusCode.code,
              }
        ),
      });
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
    if (isLogin) {
      getApprovalItem();
    }
  }, [isLogin]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        결재 처리
      </h1>
      <Status statusCode={item.statusCode} />
      <Editor
        itemProps={item}
        isRejected={isRejected}
        onProcess={process}
      ></Editor>
      <Histories histories={histories} />
    </div>
  );
}
