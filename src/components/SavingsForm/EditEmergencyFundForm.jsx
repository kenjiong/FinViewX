import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "react-daisyui";
import * as savingsService from "../../utilities/savings-service";
import debug from "debug";

const log = debug("finviewx:src:SavingsForm");

export default function EditEmergencyFundForm({ savings }) {
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
      await savingsService.editEmergencyFund(savings, savingsId);
      navigate("/save");
    } catch (error) {
      setError("Failed to edit emergency fund - Try again");
    }
  }

  return (
    <div className="flex flex-col items-center mt-2">
      <h2 className="mb-4 text-2xl font-bold text-accent">Edit Emergency Fund</h2>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleEdit}>
          <label className="label">Estimated Monthly Expenses</label>
          <Input
            type="number"
            name="monthlyExpenses"
            step=".01"
            value={monthlyExpenses}
            min="0"
            onChange={(event) => setMonthlyExpenses(event.target.value)}
            required
          />
          <label className="label">No. of months</label>
          <Input
            type="number"
            name="months"
            value={months}
            min="1"
            onChange={(event) => setMonths(event.target.value)}
            required
          />
          <label className="label-text-alt text-secondary">*Recommended: 3-6 months</label>
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={()=>navigate("/save")}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Edit Your Emergency Fund</Button>
          </span>
          <p className="error-message text-error flex justify-center mt-2">&nbsp;{error}</p>
        </Form>
      </div>
    </div>
  );
}
