import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
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
            <NavBar />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/save" element={<SavePage />}></Route>
              <Route path="/retire" element={<RetirePage />}></Route>
              <Route path="/premium" element={<PremiumPage />}></Route>
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
