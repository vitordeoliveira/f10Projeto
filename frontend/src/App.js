import React, { useState, useMemo } from "react";
import "./App.css";
import Routes from "./routes";
import { UserContext } from "./context/UserContext";

function App() {
  const [authToken, setAuthToken] = useState();

  const setToken = data => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  // const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Routes></Routes>;
    </UserContext.Provider>
  );
}

export default App;
