import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
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
    <div>
    <h3>Edit Emergency Fund</h3>
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleEdit}>
      <label>Your ideal retirement age</label>
          <input
            type="number"
            name="retirementAge"
            value={retirementAge}
            placeholder="Age"
            min="1"
            onChange={(event) => setRetirementAge(event.target.value)}
            required
          /><br />
          <small>The minimum retirement age in Singapore is 63</small>
          <br />
          <label>Your live till age</label>
          <input
            type="number"
            name="lifeExpectancy"
            value={lifeExpectancy}
            placeholder="Age"
            min="1"
            onChange={(event) => setLifeExpectancy(event.target.value)}
            required
          /><br />
          <small>The average life expectancy in Singapore is 83.9 years</small>
          <br />
          <label>Estimated monthly expenses after retirement</label>
          <input
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
          <Button type="button" onClick={()=>navigate("/retire")}>Back</Button>
        <Button type="submit">Edit Your Retirement Goal</Button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
  );
}
