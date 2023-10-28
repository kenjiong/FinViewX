import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
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
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Please enter your email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              placeholder="Please enter your password"
              minlength="8"
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleShowPassword}>
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
