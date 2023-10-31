import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as retirementService from "../../utilities/retirement-service";

export default function SetRetirementGoalForm() {
  const [formData, setFormData] = useState({
    birthDate: "",
    retirementAge: "",
    lifeExpectancy: "",
    monthlyExpenses: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await retirementService.setRetirementGoal(formData);
      setFormData({
        birthDate: "",
        retirementAge: 0,
        lifeExpectancy: 0,
        monthlyExpenses: 0,
      });
      navigate("/retire");
    } catch (error) {
      setError("Failed to set retirement goal - Try again");
    }
  }

  return (
    <div>
      <h3>Set Retirement Goal</h3>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Your birth date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <br />
          <label>Your ideal retirement age</label>
          <input
            type="number"
            name="retirementAge"
            value={formData.retirementAge}
            placeholder="Age"
            min="1"
            onChange={handleChange}
            required
          /><br />
          <small>The minimum retirement age in Singapore is 63</small>
          <br />
          <label>Your live till age</label>
          <input
            type="number"
            name="lifeExpectancy"
            value={formData.lifeExpectancy}
            placeholder="Age"
            min="1"
            onChange={handleChange}
            required
          /><br />
          <small>The average life expectancy in Singapore is 83.9 years</small>
          <br />
          <label>Estimated monthly expenses after retirement</label>
          <input
            type="number"
            name="monthlyExpenses"
            step=".01"
            value={formData.monthlyExpenses}
            placeholder="1,500"
            min="0"
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Set Your Retirement Goal</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
