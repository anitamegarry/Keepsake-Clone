import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <button className="edit-labels-btn">Edit Labels</button>
      <button className="add-notes-btn">Add Note</button>
      <section className="login">
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </section>
      <section className="register">
        <h2>Register</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
      </section>
    </div>
  );
}
