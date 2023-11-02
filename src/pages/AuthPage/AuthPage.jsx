import { useState } from "react";
import { Button } from "react-daisyui";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
  const [show, setShow] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {show ? (
        <>
          <h2 className="mb-5 text-2xl font-bold text-accent">
            Log in to your FinViewX Account
          </h2>
          <LoginForm
            setUser={setUser}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
          <br />
          Don't have a FinViewX account?{" "}
          <Button onClick={handleShow} color="secondary" size="sm">
            Sign Up Here
          </Button>
        </>
      ) : (
        <>
          <h2 className="mb-5 text-2xl font-bold text-accent">
            Register for a FinViewX Account!
          </h2>
          <SignUpForm
            setUser={setUser}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            showConfirm={showConfirm}
            handleShowConfirm={handleShowConfirm}
          />
          <br />
          Already have a FinViewX account?{" "}
          <Button onClick={handleShow} color="secondary" size="sm">
            Login Here
          </Button>
        </>
      )}
    </main>
  );
}
