import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import debug from "debug";

const log = debug("finviewx:src:App");
localStorage.debug = "finviewx:*";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <main>{user ? <></> : <AuthPage setUser={setUser} />}</main>
    </>
  );
}

export default App;
