import { useState, useEffect } from "react";
import SetEmergencyFundForm from "../../components/SavingsForm/SetEmergencyFundForm";
import EditEmergencyFundForm from "../../components/SavingsForm/EditEmergencyFundForm";
import * as savingsService from "../../utilities/savings-service";
import debug from "debug";

const log = debug("finviewx:src:SavePage");

export default function SaveFormPage({ user }) {
  const [savings, setSavings] = useState([]);
  const userId = user._id;

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const data = await savingsService.getEmergencyFund(userId);
        setSavings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchSavings();
  }, [userId]);

  return (
    <>
      {savings[0]?.monthlyExpenses ? (
        <>
          <EditEmergencyFundForm savings={savings[0]} />
        </>
      ) : (
        <>
          <SetEmergencyFundForm />
        </>
      )}
    </>
  );
}
