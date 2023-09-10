
import Homepage from "./pages/Homepage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { Footer } from "./components/Footer";
import Fileshared from "./pages/Fileshared";
import Navbar from "./components/Navbar";

export const context = createContext([])
const url = "https://fileshare-backend-s3-i6kbkflgp-sanjeevkumar-woks.vercel.app";

function App() {
  const [aut, setAut] = useState({email_verified:false});
  return (
    <div className="App">
      <Navbar aut={aut} setAut={setAut}/>
      <div className="HorizontalLine"></div>
      <context.Provider value={[aut, setAut, url]}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              aut.email_verified ? (
                <Dashboard />
              ) : (
                <Homepage />
              )
            }
          />
          <Route
            exact path="/share/:filename/:size"
            element={aut.email_verified ? (
              <Fileshared/>
            ) : (
              <Homepage />
            )} />
        </Routes>
      </context.Provider>
      <Footer />
    </div>
  );
}

export default App;
