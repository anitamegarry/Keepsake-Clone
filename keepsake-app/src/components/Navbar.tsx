import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="appName">Keepsake</h1>
      <button className="logout-btn">Log out</button>
    </div>
  );
}
