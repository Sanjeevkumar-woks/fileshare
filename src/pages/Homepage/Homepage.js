import React, { useContext } from "react";
import "./homepage.css";
import homeimg from "./Uploading-rafiki.png";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { context } from "../../App";

export default function Homepage() {

  const [, setAut, url] = useContext(context);


  const handelLogin = (userCredentials) => {
    var decoded = jwt_decode(userCredentials.credential);
    fetch(`${url}/api/files/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        <h1 className="homeMainHeading"><small>Unlimited Cloud Storage:</small> Safeguard Your Precious Memories and Data with Ease!</h1>
        <h3 className="homeSubTitle">"Seamless Access, Effortless Protection, and Endless Possibilities for Your Digital Life."</h3>
      </div>
      <div className="homepage-img">
        <img className="home-img" src={homeimg} alt="home-page-img" />
      </div>
    </div>
  );
}
