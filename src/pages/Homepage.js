import React from "react";
import "./homepage.css";
import homeimg from "./Uploading-rafiki.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export default function Homepage({ setAut }) {
  const handelLogin = (userCredentials) => {
    var token = userCredentials.credential;
    var decoded = jwt_decode(token);
    setAut(decoded);
    console.log(decoded);
    console.log(userCredentials);
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
