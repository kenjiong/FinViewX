import { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
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
      <main>
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
            <footer className="footer footer-center p-10 bg-primary text-primary-content">
              <aside>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="inline-block fill-current"
                >
                  <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                </svg>
                <p className="font-bold">
                  FinViewX&trade; - Your Finances in View
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
                      class="bi bi-github"
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
