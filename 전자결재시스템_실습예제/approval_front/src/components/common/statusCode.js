const STATUS_CODES = [
  { code: "TMP", value: "임시저장" },
  { code: "PND", value: "결재대기" },
  { code: "APR", value: "결재중" },
  { code: "CMP", value: "결재완료" },
  { code: "REJ", value: "반려" },
];

const POSITION_CODES = [
  { code: "pg", value: "사원", level: 1 },
  { code: "aa", value: "대리", level: 2 },
  { code: "pl", value: "과장", level: 3 },
  { code: "pm", value: "부장", level: 4 },
];

const findStatusObjectByCode = function (code) {
  return STATUS_CODES.find((stat) => stat.code === code);
};

const findPositionObjectByCode = function (code) {
  return POSITION_CODES.find((po) => po.code === code);
};

export const getNextStatusByApprove = function (currentStatus, levelNo) {
  //   const position = findPositionObjectByCode(positionCd);

  if (!currentStatus || !levelNo) {
    throw new Error();
  }

  if (currentStatus === "TMP") {
    return "PND"; // 임시저장 -> 결재대기
  }
  if (currentStatus === "PND") {
    if (levelNo < 3) {
      throw new Error();
    }
    return "APR"; // 결재대기 -> 결재중 TODO: 권한체크필요 과장 부장 가능
  }
  if (currentStatus === "APR") {
    if (levelNo < 4) {
      throw new Error();
    }
    return "CMP"; // 결재중 -> 결재완료 TODO: 권한체크필요 부장 가능
  }
};

export const getNextStatusByReject = function (levelNo) {
  if (levelNo < 4) {
    throw new Error();
  }
  return "REJ"; // 부장 가능
};

/**
 * 결재목록 조건

-모든 직급의 사용자는 글등록 가능
-한번 결재 올린 문서는 취소 불가능
-임시저장 : 글등록자 이외의 다른 사람은 볼 수 없음 // level 1,2,3,4 가능
-결재대기 : 사원 혹은 대리 급 사용자가 결재요청 시 상태 // level 1,2,3,4 가능
-결재중 : 결재대기인 문서를 과장급 사용자가 결재요청 시 상태 // level 3, 4만 가능
-결재완료 : 결재중인 문서를 부장급 사용자가 결재요청 시 상태 // level 4만 가능
-반려 : 과장 혹은 부장이 반려 시킬 수 있고 반려된 문서는 
       다시 결재 요청할 수 있는 상태로 돌아감 // level 3,4만 가능

사원 및 대리  : 내가 작성한 글 이외 다른 글은 노출X // level 1,2
과장 : 내가 작성한 글, 결재대기 올라온 문서, 내가 결재 처리한 문서만 노출 // level 3
(**다른 과장이 처리한 문서(반려 혹은 결재중) 노출 X)
부장 : 내가 작성한 글, 결재중으로 올라온 문서, 결재완료된 모든 문서, 부장급에서 반려시킨 문서 // level4
(**다른 부장이 처리한 문서도 노출O)

 */
