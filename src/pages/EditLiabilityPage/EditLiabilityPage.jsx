import { useLocation } from "react-router-dom";
import EditLiabilityForm from "../../components/LiabilityForm/EditLiabilityForm";
import debug from "debug";

const log = debug("finviewx:src:EditLiabilityPage");

export default function EditLiabilityPage() {
  const location = useLocation();
  const { liability } = location.state;

  return (
    <>
      <EditLiabilityForm liability={liability}/>
    </>
  );
}
