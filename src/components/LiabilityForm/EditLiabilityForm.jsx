import { useState } from "react";
import * as liabilitiesService from "../../utilities/liabilities-service";

export default function EditLiabilityForm({ liability, fetchLiabilities }) {
  const [name, setName] = useState(liability.name);
  const [value, setValue] = useState(liability.value);
  const liabilityId = liability._id;

  const handleEdit = async () => {
    const liability = {
      name,
      value,
    };
    await liabilitiesService.editLiability(liability, liabilityId);
    fetchLiabilities();
  };

  return (
    <>
      <dialog id="edit-liability" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Liability</h3>
          <div className="modal-action">
            <div className="form-container">
              <form autoComplete="off" method="dialog">
                <label>Liability Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  min="0"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <label>Liability Amount</label>
                <input
                  type="number"
                  name="value"
                  step=".01"
                  value={value}
                  min="1"
                  onChange={(event) => setValue(event.target.value)}
                  required
                />
                <button className="btn" onClick={close()}>
                  Close
                </button>{" "}
                |{" "}
                <button className="btn" onClick={handleEdit}>
                  Edit Liability
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
