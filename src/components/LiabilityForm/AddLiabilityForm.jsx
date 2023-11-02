import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "react-daisyui";
import * as liabilitiesService from "../../utilities/liabilities-service";

export default function AddLiabilityForm({
  liabilities,
  fetchLiabilities,
  setShowLiabilityForm,
}) {
  const [liability, setLiability] = useState({
    type: "",
    name: "",
    value: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setLiability({ ...liability, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < liabilities.length; i++) {
      if (liabilities[i].name === liability.name) {
        setError("You have already added this liability");
        return;
      }
    }
    try {
      await liabilitiesService.createLiability(liability);
      fetchLiabilities();
      setLiability({
        type: "",
        name: "",
        value: 0,
      });
      setShowLiabilityForm(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Liability addition failed - Try Again");
    }
  }

  return (
    <div className="flex flex-col items-center mt-2">
      <h3 className="mb-4 text-2xl font-bold text-accent">New Liability</h3>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Type</label>
          <Select
            name="type"
            value={liability.type}
            id="type-select"
            onChange={handleChange}
            required
          >
            <option value="">Please choose the type of liability</option>
            <option value="creditcard">Credit Card</option>
            <option value="loan">Loan</option>
            <option value="other">Other</option>
          </Select>
          <br />
          <label className="label">Liability Name</label>
          <Input
            type="text"
            name="name"
            value={liability.name}
            placeholder="Liability Name"
            onChange={handleChange}
            required
          />
          <br />
          <label className="label">Liability Amount</label>
          <Input
            type="number"
            name="value"
            step=".01"
            value={liability.value}
            placeholder="Asset Name"
            min="0"
            onChange={handleChange}
            required
          />
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={() => setShowLiabilityForm(false)}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Add Liability</Button>
          </span>
        </Form>
      </div>
      <p className="error-message text-error">&nbsp;{error}</p>
    </div>
  );
}
