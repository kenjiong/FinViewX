import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import DashboardPage from "../DashboardPage/DashboardPage";
import EditAssetPage from "../EditAssetPage/EditAssetPage";
import EditLiabilityPage from "../EditLiabilityPage/EditLiabilityPage";
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
      <main className="flex flex-col min-h-screen">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <br />
            <br />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={<DashboardPage user={user} />}
              />
              <Route path="/asset/edit" element={<EditAssetPage />} />
              <Route path="/liability/edit" element={<EditLiabilityPage />} />
              <Route path="/save" element={<SavePage user={user} />} />
              <Route path="/save/form" element={<SaveFormPage />} />
              <Route path="/retire" element={<RetirePage user={user} />} />
              <Route path="/retire/form" element={<RetireFormPage />} />
              <Route
                path="/premium"
                element={<PremiumPage user={user} setUser={setUser} />}
              />
            </Routes>
            <br />
            <br />
            <footer className="footer footer-center p-10 bg-primary text-primary-content mt-auto">
              <aside>
              <img src="/whitelogo.svg" height="200px" width="200px" className="mb-2"/>
                <p className="text-xl">
                  FinViewX&trade; | Your Finances in View
                </p>
                <small>Copyright © 2023 - All rights reserved</small>
              </aside>
              <nav>
                <div className="grid grid-flow-col gap-4">
                  <a href="https://github.com/kenjiong">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
              </nav>
            </footer>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
