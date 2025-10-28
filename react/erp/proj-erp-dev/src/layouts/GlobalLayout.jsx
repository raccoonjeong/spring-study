import { Outlet } from "react-router-dom";
import NavBar from "@/components/common/NavBar";
import ScrollToTop from "@/components/common/ScrollToTop";
import TopButton from "@/components/common/TopButton";
import useCart from "@/hooks/useCart";

function AuthButton() {
  return (
    <div className="bg-primary text-white font-bold flex space-x-2 items-center px-3 py-1.5 rounded-lg">
      <div className="border-r border-white pr-2 cursor-pointer">로그인</div>
      <div className="cursor-pointer">회원가입</div>
    </div>
  );
}

export default function GlobalLayout() {
  const { count } = useCart();
  const handleSearch = () => {
    console.log("handleSearch");
  };

  const navItems = [
    { url: "/", title: "HOME" },
    { url: "/products", title: "ALL" },
    { url: "/products/women", title: "WOMEN" },
    { url: "/products/men", title: "MEN" },
    { url: "/products/kids", title: "KIDS" },
    { url: "/products/new", title: "NEW" },
    { url: "/products/best", title: "BEST" },
    { url: "/stores", title: "STORES" },
    { url: "/mgr/product", title: "상품관리", align: "right" }, // 오른쪽 텍스트
    { url: "/mgr/store", title: "매장관리", align: "right" }, // 오른쪽 텍스트
    {
      url: "/cart",
      type: "icon",
      icon: "cart",
      badge: count,
      align: "right",
    }, // 오른쪽 아이콘
    { type: "icon", icon: "search", func: handleSearch, align: "right" }, // 오른쪽 버튼
    { type: "custom", element: <AuthButton />, align: "right" }, // 오른쪽 커스텀
  ];

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* dvh: device viewport height*/}
      <header>
        <div className="fixed top-0 inset-x-0 z-50 bg-white h-[60px] border-b px-4">
          <NavBar navItems={navItems} />
        </div>
      </header>
      <main className="mt-[calc(60px+env(safe-area-inset-top))] p-4 grow">
        <Outlet />
      </main>
      <footer className="bg-stone-200 text-stone-600 p-4">&copy; MYSITE</footer>
      <ScrollToTop />
      <div className="fixed z-50 bottom-0 right-0 p-4">
        <TopButton />
      </div>
    </div>
  );
}
