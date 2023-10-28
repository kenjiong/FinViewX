import { Link } from "react-router-dom";

export default function SavePage({ user }) {
  return (
    <>
      {user.tier === "free" ? (
        <>
          <h3>The Save feature is only available for Premium users!</h3>
          <br />
          <p>Don't miss out! Subscribe to Premium today!</p>
          <Link to="/premium">
            <button>Subscribe</button>
          </Link>
        </>
      ) : user.tier === "premium" ? (
        <div className="text-center">
          <h4 className="mb-5 text-5xl font-bold">Look at this.</h4>
          <p className="mb-5 text-xl">Save for rainy days.</p>
          <p className="mb-5 text-xl">Plan your retirement.</p>
          <br />
          <p className="mb-5 text-2xl">All in one place.</p>
          <br />
        </div>
      ) : (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      )}
    </>
  );
}
