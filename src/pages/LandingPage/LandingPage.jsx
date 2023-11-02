import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/colorlogo.svg" height="450px" width="450px" />
        <br />
        <br />
        <h4 className="mb-5 text-5xl font-bold text-secondary">
          See your finances in a single view.
        </h4>
        <p className="mb-5 text-secondary text-xl">Save for rainy days.</p>
        <p className="mb-5 text-secondary text-xl">Plan your retirement.</p>
        <br />
        <p className="mb-5 text-accent text-4xl">All in one place.</p>
        <br />
        <Link to="/auth">
          <Button color="primary">Start your FinViewX journey here</Button>
        </Link>
        </div>
    </>
  );
}
