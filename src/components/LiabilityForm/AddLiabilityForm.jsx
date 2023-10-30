import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as liabilitiesService from "../../utilities/liabilities-service";
import { getUser } from "../../utilities/users-service";

export default function AddLiabilityForm({ setUser, setShowLiabilityForm }) {
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
    try {
      const updatedUser = await liabilitiesService.createLiability(liability);
      setUser(updatedUser);
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
    <div>
      <h3>New Liability</h3>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label for="type-select">Type</label>
          <select
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
          </select>
          <label>Liability Name</label>
          <input
            type="text"
            name="name"
            value={liability.name}
            placeholder="Liability Name"
            onChange={handleChange}
            required
          />
          <label>Liability Amount</label>
          <input
            type="number"
            name="value"
            step=".01"
            value={liability.value}
            placeholder="Asset Name"
            min="0"
            onChange={handleChange}
            required
          />
          <button type="submit">Add Liability</button>{" "}|{" "}
          <button type="button" onClick={()=>setShowLiabilityForm(false)}>Back</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
