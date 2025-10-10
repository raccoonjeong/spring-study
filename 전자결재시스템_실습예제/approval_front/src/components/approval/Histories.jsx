const Histories = function ({ histories = [] }) {
  const STATUS_CLASSES = {
    TMP: "bg-stone-100 text-stone-700 ring-stone-200 px-2 py-1 text-xs ring-1 rounded-md",
    PND: "bg-amber-100 text-amber-700 ring-amber-200 px-2 py-1 text-xs ring-1 rounded-md",
    APR: "bg-blue-100 text-blue-700 ring-blue-200 px-2 py-1 text-xs ring-1 rounded-md",
    CMP: "bg-emerald-100 text-emerald-700 ring-emerald-200 px-2 py-1 text-xs ring-1 rounded-md",
    REJ: "bg-rose-100 text-rose-700 ring-rose-200 px-2 py-1 text-xs ring-1 rounded-md",
  };

  const getColorClassesByStatus = function (status) {
    return STATUS_CLASSES[status] || STATUS_CLASSES["TMP"];
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-3">
        <h3 className="text-base font-semibold text-stone-900">문서상태</h3>
      </div>
      <div className="mt-3 pl-5 text-left text-xs text-stone-500 ">
        * 상태는 시간 순서대로 표시됩니다...
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
            {histories.length > 0 ? (
              histories.map((history, index) => (
                <tr className="border-t border-stone-200" key={index}>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{history.procName}</td>
                  <td className="px-4 py-3 text-sm">{history.positionName}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={getColorClassesByStatus(history.statusCode)}
                    >
                      {history.statusName}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
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
  );
};

export default Histories;
