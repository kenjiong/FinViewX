import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "react-daisyui";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import * as usersService from "../../utilities/users-service";

export default function SignUpForm({
  setUser,
  showPassword,
  handleShowPassword,
  showConfirm,
  handleShowConfirm,
}) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      delete userData.confirm;
      const newUser = await usersService.signUp(userData);
      localStorage.setItem("token", newUser.token);
      setUser(usersService.getUser());
      navigate("/dashboard");
    } catch (error) {
      setError("Sign Up Failed - Try Again");
    }
  }

  const disable = userData.password !== userData.confirm;

  return (
    <>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <Input
            type="text"
            name="name"
            value={userData.name}
            placeholder="First Last"
            onChange={handleChange}
            required
          />
          <label className="label">Email</label>
          <Input
            type="email"
            name="email"
            value={userData.email}
            placeholder="email@example.com"
            onChange={handleChange}
            required
          />
          <label className="label">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              placeholder="Min 8 characters"
              minLength="8"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-1 right-0 pr-2 flex items-center"
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <label className="label">Confirm</label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={userData.confirm}
              placeholder="Confirm password"
              minlength="8"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={handleShowConfirm}
              className="btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-1 right-0 pr-2 flex items-center"
            >
              {showConfirm ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <br />
          <Button type="submit" disabled={disable}>
            SIGN UP
          </Button>
        </Form>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    </>
  );
}
