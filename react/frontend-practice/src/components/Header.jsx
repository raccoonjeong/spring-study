export default function Header() {
  return (
    <header className="flex h-[99px]">
      <div className="space-x-4 flex justify-start items-center">
        <div>LOGO</div>
        <div>MENU</div>
        <div>REWARDS</div>
        <div>GIFT CARDS</div>
      </div>
      <div className="flex-grow"></div>
      <div className="space-x-4 flex justify-end items-center">
        <div>Find a store</div>
        <div>
          <button>Sign in</button>
        </div>
        <div>
          <button>Join now</button>
        </div>
      </div>
    </header>
  );
}
