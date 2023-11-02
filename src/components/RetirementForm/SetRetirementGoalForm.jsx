import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "react-daisyui";
import moment from "moment";
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

  const today = moment().format().split('T')[0];

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
    <div className="flex flex-col items-center mt-2">
      <h2 className="mb-4 text-2xl font-bold text-accent">Set Retirement Goal</h2>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Your birth date</label>
          <Input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            max={today}
            required
          />
          <label className="label-text-alt text-warning">*Your birth date cannot be modified later</label>
          <br />
          <label className="label">Your ideal retirement age</label>
          <Input
            type="number"
            name="retirementAge"
            value={formData.retirementAge}
            placeholder="Age"
            min="1"
            onChange={handleChange}
            required
          />
          <label className="label-text-alt text-secondary">*The minimum retirement age in Singapore is 63</label>
          <br />
          <label className="label">Your live till age</label>
          <Input
            type="number"
            name="lifeExpectancy"
            value={formData.lifeExpectancy}
            placeholder="Age"
            min="1"
            onChange={handleChange}
            required
          />
          <label className="label-text-alt text-secondary">*The average life expectancy in Singapore is 83.9 years</label>
          <br />
          <label className="label">Estimated monthly expenses after retirement</label>
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
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={()=>navigate("/retire")}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Set Your Retirement Goal</Button>
          </span>
        </Form>
      </div>
      <p className="error-message text-error">&nbsp;{error}</p>
    </div>
  );
}
