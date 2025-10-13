import StarRating from "@/components/StarRating";

export default function Home() {
  return (
    <div>
      <div className="h-[300px] w-full bg-stone-200"></div>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="pt-16 pb-8 font-extrabold text-4xl text-center">
          WEEKLY BEST
        </div>
        <div className="flex font-extrabold text-xl pb-16 space-x-16 justify-center">
          <div>WOMEN</div>
          <div className="text-gray-300">MEN</div>
          <div className="text-gray-300">KIDS</div>
        </div>
        <div className="grid grid-cols-5 gap-8">
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="pt-16 pb-8 font-extrabold text-4xl text-center">
          NEW ARRIVAL
        </div>
        <div className="flex font-extrabold text-xl pb-16 space-x-16 justify-center">
          <div>WOMEN</div>
          <div className="text-gray-300">MEN</div>
          <div className="text-gray-300">KIDS</div>
        </div>
        <div className="grid grid-cols-5 gap-8">
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a href="/products/detail/1" data-discover="true">
            <div className="py-2 space-y-2 group min-h-[500px]">
              <div className="bg-stone-100 w-[200px] h-[200px] relative">
                <img
                  src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  className="w-full aspect-square"
                />
              </div>
              <div className="hidden space-x-2 group-hover:flex">
                <div className="py-1 hover:border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY051_1.jpg?v=250904"
                  />
                </div>
                <div className="py-1 border-b border-[#0063ba]">
                  <img
                    className="h-[44px]"
                    src="https://cdn.skecherskorea.co.kr/pro_img/SL0WPCFY052_1.jpg?v=250904"
                  />
                </div>
              </div>
              <div className="font-bold">
                고런 맥스쿠셔닝 아치핏 (와이드 슬립인스)
              </div>
              <StarRating score={2.4} count={101} />
              <div className="text-gray-500">
                <span className="font-bold mr-0.5 text-black">159,000</span>원
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#203864]">
                NEW
              </div>
              <div className="block w-fit text-white text-[8pt] font-bold px-2 py-0.5 bg-[#0063ba]">
                BEST
              </div>
              <div className="text-gray-400 py-1 relative">
                <div className="font-bold text-[8pt] pb-2">SIZE</div>
                <div className="absolute hidden group-hover:block z-10 border-t-2 w-full border-gray-200">
                  <div className="grid grid-cols-7 text-[8pt] gap-2 py-2 bg-white">
                    <div>225</div>
                    <div>230</div>
                    <div className="text-gray-300">235</div>
                    <div>240</div>
                    <div>245</div>
                    <div>250</div>
                    <div className="text-gray-300">255</div>
                    <div>260</div>
                    <div className="text-gray-300">265</div>
                    <div>270</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
