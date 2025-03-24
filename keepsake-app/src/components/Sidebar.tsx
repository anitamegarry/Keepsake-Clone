import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import { label } from "../App.tsx";
import { CustomLabelInput } from "./customLabelInput.tsx";

interface sidebarProps {
  labels: label[];
  setLabels: React.Dispatch<any>;
}

export default function Sidebar({ labels, setLabels }: sidebarProps) {
  const [isEditLabels, setIsEditLabels] = useState(false);

  function handleEditLabelsClick() {
    setIsEditLabels(true);
  }

  return (
    <div className="sidebar">
      <button className="edit-labels-btn" onClick={handleEditLabelsClick}>
        Edit Labels
      </button>
      {isEditLabels && (
        <>
          <CustomLabelInput
            setIsEditLabels={setIsEditLabels}
            setLabels={setLabels}
          />
          <select>
            {labels.map((label, idx) => (
              <option key={idx} value={label.labelName}>
                {label.labelName}
              </option>
            ))}
          </select>
        </>
      )}
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
