import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h4 className="mb-5 text-5xl font-bold text-secondary">
          Are you lost?
        </h4>
        <p className="mb-5 text-accent text-4xl">
          Because FinViewX is a long way from here.
        </p>
        <br />
        <Link to="/">
          <Button color="primary">Take me back</Button>
        </Link>
      </div>
    </>
  );
}
