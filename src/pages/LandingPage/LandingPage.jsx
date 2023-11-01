import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function LandingPage() {
  return (
    <>
    <br />
    <br />
    <br />
      <div className="text-center">
        <h4 className="mb-5 text-5xl font-bold text-white">
          See your finances in a single view.
        </h4>
        <p className="mb-5 text-white text-xl">Save for rainy days.</p>
        <p className="mb-5 text-white text-xl">Plan your retirement.</p>
        <br />
        <p className="mb-5 text-white text-2xl">All in one place.</p>
        <br />
        <Link to="/auth">
          <Button color="primary">Start your FinViewX journey here</Button>
        </Link>
        </div>
    </>
  );
}
