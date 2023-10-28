import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import * as usersService from "../../utilities/users-service";

export default function SignUpForm({
  setUser,
  showPassword,
  handleShowPassword,
}) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError("");
  };

  const handleSubmit = async (event) => {
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
  };

  const disable = userData.password !== userData.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="First Last"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            placeholder="Please enter your email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              placeholder="Min 8 characters"
              onChange={handleChange}
              required
            />
            <button onClick={handleShowPassword}>
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <label>Confirm</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              value={userData.confirm}
              placeholder="Confirm your password"
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleShowPassword}>
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
