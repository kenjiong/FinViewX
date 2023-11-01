import { useState, useEffect } from "react";
import SetRetirementGoalForm from "../../components/RetirementForm/SetRetirementGoalForm";
import EditRetirementGoalForm from "../../components/RetirementForm/EditRetirementGoalForm";
import * as retirementService from "../../utilities/retirement-service";
import debug from "debug";

const log = debug("finviewx:src:RetirePage");

export default function RetireFormPage({ user }) {
  const [retirement, setRetirement] = useState([]);
  const userId = user._id;

  useEffect(() => {
    const fetchRetirement = async () => {
      try {
        const data = await retirementService.getRetirementGoal(userId);
        setRetirement(data);
      } catch (error) {
        log(error);
      }
    };
    fetchRetirement();
  }, [userId]);

  return (
    <>
      {retirement[0]?.monthlyExpenses ? (
        <>
          <EditRetirementGoalForm retirement={retirement[0]} setRetirement={setRetirement}/>
        </>
      ) : (
        <>
          <SetRetirementGoalForm />
        </>
      )}
    </>
  );
}
