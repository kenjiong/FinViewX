import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "react-daisyui";
import * as retirementService from "../../utilities/retirement-service";
import debug from "debug";

const log = debug("finviewx:src:RetirementForm");

export default function EditRetirementGoalForm({ retirement }) {
  const [retirementAge, setRetirementAge] = useState(
    retirement.retirementAge
  );
  const [lifeExpectancy, setLifeExpectancy] = useState(retirement.lifeExpectancy);
  const [monthlyExpenses, setMonthlyExpenses] = useState(retirement.monthlyExpenses);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const retirementId = retirement._id;

  async function handleEdit(event) {
    event.preventDefault();
    const retirement = {
      retirementAge,
      lifeExpectancy,
      monthlyExpenses,
    };
    try {
      await retirementService.editRetirementGoal(retirement, retirementId);
      navigate("/retire");
    } catch (error) {
      setError("Failed to edit retirement goal - Try again");
    }
  }

  return (
    <div className="flex flex-col items-center mt-2">
    <h2 className="mb-4 text-2xl font-bold text-accent">Edit Retirement Goal</h2>
    <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Form autoComplete="off" onSubmit={handleEdit}>
      <label className="label">Your ideal retirement age</label>
          <Input
            type="number"
            name="retirementAge"
            value={retirementAge}
            placeholder="Age"
            min="1"
            onChange={(event) => setRetirementAge(event.target.value)}
            required
          />
          <label className="label-text-alt text-secondary">*The minimum retirement age in Singapore is 63</label>
          <br />
          <label className="label">Your live till age</label>
          <Input
            type="number"
            name="lifeExpectancy"
            value={lifeExpectancy}
            placeholder="Age"
            min="1"
            onChange={(event) => setLifeExpectancy(event.target.value)}
            required
          />
          <label className="label-text-alt text-secondary">*The average life expectancy in Singapore is 83.9 years</label>
          <br />
          <label className="label">Estimated monthly expenses after retirement</label>
          <Input
            type="number"
            name="monthlyExpenses"
            step=".01"
            value={monthlyExpenses}
            placeholder="1,500"
            min="0"
            onChange={(event) => setMonthlyExpenses(event.target.value)}
            required
          />
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={()=>navigate("/retire")}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Edit Your Retirement Goal</Button>
        </span>
      </Form>
    </div>
    <p className="error-message text-error">&nbsp;{error}</p>
  </div>
  );
}
