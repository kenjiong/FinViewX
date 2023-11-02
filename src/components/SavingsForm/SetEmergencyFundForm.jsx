import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "react-daisyui";
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
      await savingsService.setEmergencyFund(formData);
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
    <div className="flex flex-col items-center mt-2">
      <h2 className="mb-4 text-2xl font-bold text-accent">Set Emergency Fund</h2>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Estimated Monthly Expenses</label>
          <Input
            type="number"
            name="monthlyExpenses"
            step=".01"
            value={formData.monthlyExpenses}
            placeholder="1,500"
            min="0"
            onChange={handleChange}
            required
          />
          <label className="label">No. of months</label>
          <Input
            type="number"
            name="months"
            value={formData.months}
            placeholder="3-6"
            min="1"
            onChange={handleChange}
            required
          />
          <label className="label-text-alt text-secondary">*Recommended: 3-6 months</label>
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={()=>navigate("/save")}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Set Your Emergency Fund</Button>
          </span>
        </Form>
      </div>
      <p className="error-message text-error">&nbsp;{error}</p>
    </div>
  );
}
