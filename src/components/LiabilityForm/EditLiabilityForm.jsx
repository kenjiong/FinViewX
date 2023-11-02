import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "react-daisyui";
import * as liabilitiesService from "../../utilities/liabilities-service";

export default function EditLiabilityForm({ liability }) {
  const [name, setName] = useState(liability.name);
  const [value, setValue] = useState(liability.value);
  const liabilityId = liability._id;
  const navigate = useNavigate();

  const handleEdit = async (event) => {
    event.preventDefault();
    const liability = {
      name,
      value,
    };
    await liabilitiesService.editLiability(liability, liabilityId);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <h3 className="mb-4 text-2xl font-bold text-accent">Edit Liability</h3>
      <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <Form autoComplete="off" onSubmit={handleEdit}>
          <label className="label">Liability Name</label>
          <Input
            type="text"
            name="name"
            value={name}
            min="0"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <br />
          <label className="label">Liability Amount</label>
          <Input
            type="number"
            name="value"
            step=".01"
            value={value}
            min="1"
            onChange={(event) => setValue(event.target.value)}
            required
          />
          <br />
          <span className="flex justify-center">
            <Button
              type="button"
              color="accent"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </Button>
            &nbsp;&nbsp;
            <Button type="submit" color="primary">
              Edit Liability
            </Button>
          </span>
        </Form>
      </div>
    </div>
  );
}
