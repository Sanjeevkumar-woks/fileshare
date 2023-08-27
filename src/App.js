import logo from "./logo.png";
import Homepage from "./pages/Homepage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";

function App() {
  const [aut, setAut] = useState({});
  const logOut = () => {
    googleLogout();
    setAut({});
  };
  return (
    <div className="App">
      <div className="navbar">
        <img className="logo" src={logo} alt="fileshare-logo" />
        {aut.email_verified ? (
          <div className="profile">
            <img
              className="profile-img"
              src={aut.picture}
              alt={aut.name + "-img"}
            />
            <small className="profile-name">{aut.name}</small>
            <button className="logout" onClick={logOut}>
              logOut
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            aut.email_verified ? (
              <Dashboard aut={aut} />
            ) : (
              <Homepage setAut={setAut} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
