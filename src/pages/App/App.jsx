import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import DashboardPage from "../DashboardPage/DashboardPage";
import SavePage from "../SavePage/SavePage";
import SaveFormPage from "../SavePage/SaveFormPage";
import RetirePage from "../RetirePage/RetirePage";
import RetireFormPage from "../RetirePage/RetireFormPage";
import PremiumPage from "../PremiumPage/PremiumPage";
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
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<DashboardPage user={user} />}
              />
              <Route path="/save" element={<SavePage user={user} />} />
              <Route path="/save/form" element={<SaveFormPage user={user} />} />
              <Route path="/retire" element={<RetirePage user={user} />} />
              <Route
                path="/retire/form"
                element={<RetireFormPage user={user} />}
              />
              <Route
                path="/premium"
                element={<PremiumPage user={user} setUser={setUser} />}
              />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="*"
              element={
                <span>
                  <h3>Something went wrong. Click</h3>
                  <Link to="/">here</Link>
                  <h3>to return</h3>
                </span>
              }
            />
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
