import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Form, Input, Button } from "react-daisyui";
import * as usersService from "../../utilities/users-service";

export default function LoginForm({
  setUser,
  showPassword,
  handleShowPassword,
}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await usersService.login(credentials);
      localStorage.setItem("token", user.token);
      setUser(usersService.getUser());
      navigate("/dashboard");
    } catch (error) {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Email</label>
          <Input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="example@mail.com"
            onChange={handleChange}
            required
          />
          <label className="label">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              placeholder="Your password"
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
          <br />
          <Button type="submit">LOG IN</Button>
        </Form>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    </>
  );
}
