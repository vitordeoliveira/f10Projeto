import React, { useState, useMemo } from "react";
import "./App.css";
import Routes from "./routes";
import { UserContext } from "./context/UserContext";

function App() {
  const [auth, setAuth] = useState();
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <UserContext.Provider value={providerValue}>
      <Routes></Routes>;
    </UserContext.Provider>
  );
}

export default App;
