import { useLocation } from "react-router-dom";
import SetEmergencyFundForm from "../../components/SavingsForm/SetEmergencyFundForm";
import EditEmergencyFundForm from "../../components/SavingsForm/EditEmergencyFundForm";
import debug from "debug";

const log = debug("finviewx:src:SavePage");

export default function SaveFormPage() {
  const location = useLocation();
  const { savings } = location.state;

  return (
    <>
      {savings?.monthlyExpenses ? (
        <>
          <EditEmergencyFundForm savings={savings}/>
        </>
      ) : (
        <>
          <SetEmergencyFundForm />
        </>
      )}
    </>
  );
}
