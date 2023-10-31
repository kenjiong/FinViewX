import { useState } from "react";
import * as assetsService from "../../utilities/assets-service";

export default function EditAssetForm({ asset }) {
  const [name, setName] = useState(asset.name);
  const [value, setValue] = useState(asset.value);
  const assetId = asset._id;

  const handleEdit = async () => {
    const asset = {
      name,
      value,
    };
    await assetsService.editAsset(asset, assetId);
  };

  return (
    <>
      <dialog id="edit-asset" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Asset</h3>
          <div className="modal-action">
            <div className="form-container">
              <form autoComplete="off" method="dialog">
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
                <button className="btn" onClick={close()}>Close</button> |{" "} 
                <button className="btn" onClick={handleEdit}>Edit Asset</button>
              </form>
            </div>
            </div>
        </div>
      </dialog>
    </>
  );
}
