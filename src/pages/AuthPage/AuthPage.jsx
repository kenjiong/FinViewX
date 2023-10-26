import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
  const [show, setShow] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main>
      {show ? (
        <>
          <h3>Log In to your FinViewX Account</h3>
          <button onClick={handleShow}>Sign Up</button>
          <LoginForm
            setUser={setUser}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
        </>
      ) : (
        <>
          <h3>Register for a FinViewX Account!</h3>
          <button onClick={handleShow}>Login</button>
          <SignUpForm
            setUser={setUser}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
        </>
      )}
    </main>
  );
}
