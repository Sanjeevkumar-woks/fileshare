import React from "react";
import "./homepage.css";
import homeimg from "./Uploading-rafiki.png";
import { GoogleLogin } from "@react-oauth/google";

export default function Homepage({ setAut }) {
  return (
    <div className="homepage-container">
      <div className="homepage-login">
        <GoogleLogin onSuccess={() => setAut(true)} />
      </div>
      <div className="homepage-img">
        <img className="home-img" src={homeimg} alt="home-page-img" />
      </div>
    </div>
  );
}
