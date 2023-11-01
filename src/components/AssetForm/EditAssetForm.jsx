import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-daisyui";
import * as assetsService from "../../utilities/assets-service";
import debug from "debug";

const log = debug("finviewx:src:AssetForm");

export default function EditAssetForm({ asset }) {
  const [name, setName] = useState(asset.name);
  const [value, setValue] = useState(asset.value);
  const assetId = asset._id;
  const navigate = useNavigate();

  const handleEdit = async (event) => {
    event.preventDefault();
    const asset = {
      name,
      value,
    };
    await assetsService.editAsset(asset, assetId);
    navigate("/dashboard");
  };

  return (
    <>
     <h3 className="font-bold text-lg">Edit Asset</h3>
          <Form autoComplete="off" onSubmit={handleEdit}>
            <label>Asset Name</label>
            <input
              type="text"
              name="name"
              value={name}
              min="0"
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label>Asset Value</label>
            <input
              type="number"
              name="value"
              step=".01"
              value={value}
              min="1"
              onChange={(event) => setValue(event.target.value)}
              required
            />
            <Button type="button" onClick={()=>navigate("/dashboard")}>
             Back
            </Button>{" "}
            |{" "}
            <Button type="submit">
              Edit Asset
            </Button>
          </Form>
    </>
  );
}
