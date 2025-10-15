export default function SampleCart() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4">
      <div className="py-8 space-y-4">
        <div className="font-bold text-3xl pb-4">장바구니</div>
        <div className="space-y-8">
          <div>
            <div className="font-bold mb-2">주문상품</div>
            <table className="w-full border border-t-0 border-gray-200">
              <thead className="bg-stone-50">
                <tr className="flex border-t">
                  <th className="px-4 font-normal text-sm py-4 flex-grow">
                    상품명
                  </th>
                  <th className="px-4 font-normal text-sm py-4">정가</th>
                  <th className="px-4 font-normal text-sm py-4">상품가격</th>
                  <th className="px-4 font-normal text-sm py-4">수량</th>
                  <th className="px-4 font-normal text-sm py-4">합계</th>
                  <th className="px-4 font-normal text-sm py-4">삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6">
                    <div className="text-xs text-gray-400 flex flex-col items-center py-16">
                      <img width="75" src="/images/cart_empty.png" />
                      <div>장바구니에 담긴 상품이 없습니다.</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center space-x-8 justify-center py-8 border-4 border-gray-200">
            <div>
              상품금액 : <strong>0</strong>원
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              ></path>
            </svg>
            <div>
              배송비 <strong>0</strong>원
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.499 8.248h15m-15 7.501h15"
              ></path>
            </svg>
            <div className="text-[#0063ba]">
              결제예정금액 <strong>0</strong>원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
