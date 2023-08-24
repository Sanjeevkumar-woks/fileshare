import logo from "./logo.png";
import Homepage from "./pages/Homepage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";

function App() {
  const [aut, setAut] = useState(false);

  const logOut = () => {
    googleLogout();
    setAut(false);
  };
  return (
    <div className="App">
      <div className="navbar">
        <img className="logo" src={logo} alt="fileshare-logo" />
        {aut ? (
          <button className="logout" onClick={logOut}>
            logOut
          </button>
        ) : (
          ""
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            aut ? <Dashboard logOut={logOut} /> : <Homepage setAut={setAut} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
