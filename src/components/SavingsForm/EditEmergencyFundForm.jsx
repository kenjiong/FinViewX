import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as savingsService from "../../utilities/savings-service";
import debug from "debug";

const log = debug("finviewx:src:SavingsForm");

export default function EditEmergencyFundForm({ savings, setSavings }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    savings.monthlyExpenses
  );
  const [months, setMonths] = useState(savings.months);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const savingsId = savings._id;

  async function handleEdit(event) {
    event.preventDefault();
    const savings = {
      monthlyExpenses,
      months,
    };
    try {
      const updatedSavings = await savingsService.editEmergencyFund(savings, savingsId);
      setSavings(updatedSavings);
      navigate("/save");
    } catch (error) {
      setError("Failed to edit emergency fund - Try again");
    }
  }

  return (
    <div>
    <h3>Edit Emergency Fund</h3>
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleEdit}>
        <label>Estimated Monthly Expenses</label>
        <input
          type="number"
          name="monthlyExpenses"
          step=".01"
          value={monthlyExpenses}
          min="0"
          onChange={(event) => setMonthlyExpenses(event.target.value)}
          required
        />
        <label>No. of months</label>
        <input
          type="number"
          name="months"
          value={months}
          min="1"
          onChange={(event) => setMonths(event.target.value)}
          required
        />
        <small>Recommended: 3-6 months</small>
        <button type="submit">Edit Your Emergency Fund</button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
  );
}
