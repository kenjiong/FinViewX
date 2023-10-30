import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as assetsService from "../../utilities/assets-service";
import { getUser } from "../../utilities/users-service";

export default function AddAssetForm({ setUser, setShowAssetForm }) {
  const [asset, setAsset] = useState({
    type: "",
    name: "",
    value: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setAsset({ ...asset, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updatedUser = await assetsService.createAsset(asset);
      setUser(updatedUser);
      setAsset({
        type: "",
        name: "",
        value: 0,
      });
      setShowAssetForm(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Asset addition failed - Try Again");
    }
  }

  return (
    <div>
      <h3>New Asset</h3>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label for="type-select">Type</label>
          <select name="type" value={asset.type} id="type-select" onChange={handleChange} required>
            <option value="">Please choose the type of asset</option>
            <option value="cash">Cash</option>
            <option value="investment">Cash Investment</option>
            <option value="cpf">CPF</option>
            <option value="insurance">
              Insurance (Protection with cash value)
            </option>
            <option value="property">Property</option>
            <option value="other">Other</option>
          </select>
          <label>Asset Name</label>
          {asset.type === "cpf" ? (
            <>
              <select name="name" value={asset.name} onChange={handleChange} required>
                <option value="">Please choose the CPF account</option>
                <option value="OA">OA</option>
                <option value="SA">SA</option>
                <option value="MA">MA</option>
              </select>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={asset.name}
                placeholder="Asset Name"
                onChange={handleChange}
                required
              />
            </>
          )}
          <label>Asset Value</label>
          <input
            type="number"
            name="value"
            step=".01"
            value={asset.value}
            placeholder="Asset Name"
            min="0"
            onChange={handleChange}
            required
          />
          <button type="submit">Add Asset</button>{" "}|{" "}
          <button type="button" onClick={()=>setShowAssetForm(false)}>Back</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
