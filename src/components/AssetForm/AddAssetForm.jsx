import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "react-daisyui";
import * as assetsService from "../../utilities/assets-service";

export default function AddAssetForm({
  assets,
  fetchAssets,
  setShowAssetForm,
}) {
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
    for (let i = 0; i < assets.length; i++) {
      if (assets[i].name === asset.name) {
        setError("You have already added this asset")
        return;
      }
    }
    try {
      await assetsService.createAsset(asset);
      fetchAssets();
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
    <div className="flex flex-col items-center mt-2">
      <h3 className="mb-4 text-2xl font-bold text-accent">New Asset</h3>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label className="label">Type</label>
          <Select
            name="type"
            value={asset.type}
            id="type-select"
            onChange={handleChange}
            required
          >
            <option value="">Please choose the type of asset</option>
            <option value="cash">Cash</option>
            <option value="investment">Cash Investment</option>
            <option value="cpf">CPF</option>
            <option value="insurance">
              Insurance (Protection with cash value)
            </option>
            <option value="property">Property</option>
            <option value="other">Other</option>
          </Select>
          <br />
          <label className="label">Asset Name</label>
          {asset.type === "cpf" ? (
            <>
              <Select
                name="name"
                value={asset.name}
                onChange={handleChange}
                required
              >
                <option value="">Please choose the CPF account</option>
                <option value="OA">OA</option>
                <option value="SA">SA</option>
                <option value="MA">MA</option>
              </Select>
            </>
          ) : (
            <>
              <Input
                type="text"
                name="name"
                value={asset.name}
                placeholder="Asset Name"
                onChange={handleChange}
                required
              />
            </>
          )}
          <br />
          <label className="label">Asset Value</label>
          <Input
            type="number"
            name="value"
            step=".01"
            value={asset.value}
            placeholder="Asset Name"
            min="0"
            onChange={handleChange}
            required
          />
          <br />
          <span className="flex justify-center">
          <Button type="button" color="accent" onClick={() => setShowAssetForm(false)}>Back</Button>&nbsp;&nbsp;
          <Button type="submit" color="primary">Add Asset</Button>
          </span>
        </Form>
      </div>
      <p className="error-message text-error">&nbsp;{error}</p>
    </div>
  );
}
