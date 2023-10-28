import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import DashboardPage from "../DashboardPage/DashboardPage";
import SavePage from "../SavePage/SavePage";
import RetirePage from "../RetirePage/RetirePage";
import PremiumPage from "../PremiumPage/PremiumPage";
import AddAssetForm from "../../components/AssetForm/AddAssetForm";
import EditAssetForm from "../../components/AssetForm/EditAssetForm";
import AddLiabilityForm from "../../components/LiabilityForm/AddLiabilityForm";
import EditLiabilityForm from "../../components/LiabilityForm/EditLiabilityForm";
import SetEmergencyFundForm from "../../components/SavingsForm/SetEmergencyFundForm";
import EditEmergencyFundForm from "../../components/SavingsForm/EditEmergencyFundForm";
import SetRetirementGoalForm from "../../components/RetirementForm/SetRetirementGoalForm";
import EditRetirementGoalForm from "../../components/RetirementForm/EditRetirementGoalForm";
import { getUser } from "../../utilities/users-service";
import debug from "debug";

const log = debug("finviewx:src:App");
localStorage.debug = "finviewx:*";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <main>
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/assets/add" element={<AddAssetForm />}></Route>
              <Route
                path="/assets/:assetid/edit"
                element={<EditAssetForm />}
              ></Route>
              <Route
                path="/liabilities/add"
                element={<AddLiabilityForm />}
              ></Route>
              <Route
                path="/liabilites/:liabilityid/edit"
                element={<EditLiabilityForm />}
              ></Route>
              <Route path="/save" element={<SavePage />}></Route>
              <Route
                path="/save/set"
                element={<SetEmergencyFundForm />}
              ></Route>
              <Route
                path="/save/edit"
                element={<EditEmergencyFundForm />}
              ></Route>
              <Route path="/retire" element={<RetirePage />}></Route>
              <Route
                path="/retire/set"
                element={<SetRetirementGoalForm />}
              ></Route>
              <Route
                path="/retire/edit"
                element={<EditRetirementGoalForm />}
              ></Route>
              <Route
                path="/premium"
                element={<PremiumPage user={user} />}
              ></Route>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route
              path="/auth"
              element={<AuthPage setUser={setUser} />}
            ></Route>
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
