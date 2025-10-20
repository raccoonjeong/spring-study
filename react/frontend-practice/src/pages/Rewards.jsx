import rewardsHero from "@/assets/rewards-hero.png";

export default function Rewards() {
  return (
    <div>
      <div className="bg-star-dark-green">
        <p className="text-white">Starbucks® Rewards</p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p>It’s a great day for free coffee</p>
          <p>Sign up and start enjoying the perks of Starbucks® Rewards.</p>

          <button>Join now</button>
          <p>It's even better with the app.</p>
        </div>
        <div className="flex-1">
          <img src={rewardsHero} />
        </div>
      </div>
    </div>
  );
}
