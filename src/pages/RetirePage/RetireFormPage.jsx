import { useLocation } from "react-router-dom";
import SetRetirementGoalForm from "../../components/RetirementForm/SetRetirementGoalForm";
import EditRetirementGoalForm from "../../components/RetirementForm/EditRetirementGoalForm";
import debug from "debug";

const log = debug("finviewx:src:RetirePage");

export default function RetireFormPage() {
  const location = useLocation();
  const { retirement } = location.state

  return (
    <>
      {retirement?.monthlyExpenses ? (
        <>
          <EditRetirementGoalForm
            retirement={retirement}
          />
        </>
      ) : (
        <>
          <SetRetirementGoalForm />
        </>
      )}
    </>
  );
}
