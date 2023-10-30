import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as savingsService from "../../utilities/savings-service";

export default function SetEmergencyFundForm() {
  const [formData, setFormData] = useState({
    monthlyExpenses: 0,
    months: 0,
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
      const updatedUser = await savingsService.setEmergencyFund(formData);
      setUser(updatedUser);
      setFormData({
        monthlyExpenses: 0,
        months: 0,
      });
      navigate("/save");
    } catch (error) {
      setError("Failed to set emergency fund - Try again");
    }
  }

  return (
    <div>
      <h3>Set Emergency Fund</h3>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Estimated Monthly Expenses</label>
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
          <label>No. of months</label>
          <input
            type="number"
            name="months"
            value={formData.months}
            placeholder="3-6"
            min="1"
            onChange={handleChange}
            required
          />
          <small>Recommended: 3-6 months</small>
          <button type="submit">Set Your Emergency Fund</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
