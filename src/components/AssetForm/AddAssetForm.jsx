import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as assetsService from "../../utilities/asset-service";

export default function AddAssetForm({ user }) {
  const [asset, setAsset] = useState({
    type: "",
    name: "",
    value: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setAsset({ ...asset, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newAsset = await assetsService.login(credentials);
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
