import React from "react";
import "./homepage.css";
import homeimg from "./Uploading-rafiki.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const url = "http://localhost:9000";
export default function Homepage({ setAut }) {
  const handelLogin = (userCredentials) => {
    var decoded = jwt_decode(userCredentials.credential);
    fetch(`${url}/files/login`, {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(decoded),
    })
      .then((res) => res.json())
      .then((data) => setAut(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="homepage-container">
      <div className="homepage-login">
        <GoogleLogin
          onSuccess={(responseCresentials) => handelLogin(responseCresentials)}
          onError={() => console.log("login Failed")}
        />
      </div>
      <div className="homepage-img">
        <img className="home-img" src={homeimg} alt="home-page-img" />
      </div>
    </div>
  );
}
