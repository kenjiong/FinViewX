import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-daisyui";
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
    <>
      <h3 className="font-bold text-lg">Edit Liability</h3>
      <Form autoComplete="off" onSubmit={handleEdit}>
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
        <Button type="button" onClick={() => navigate("/dashboard")}>Back</Button> |{" "}
        <Button type="submit">Edit Liability</Button>
      </Form>
    </>
  );
}
