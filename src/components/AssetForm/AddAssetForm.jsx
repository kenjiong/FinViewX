import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as assetsService from "../../utilities/asset-service";

export default function AddAssetForm({ user }) {
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
      await assetsService.createAsset(asset);
      setUser(usersService.getUser());
      setAsset({
        type: "",
        name: "",
        value: 0,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Asset addition failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label for="type-select">Type</label>
          <select name="type" value={asset.type} id="type-select" onChange={handleChange}>
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
              <select name="name" value={asset.name} onChange={handleChange}>
                <option value="">Please choose the CPF account</option>
                <option value="oa">OA</option>
                <option value="sa">SA</option>
                <option value="ma">MA</option>
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
            value={asset.value}
            placeholder="Asset Name"
            min="0"
            onChange={handleChange}
            required
          />
          <button type="submit">Add Asset</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
