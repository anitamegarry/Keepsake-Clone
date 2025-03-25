import "./Sidebar.css";
import { useState } from "react";
import { label } from "../App.tsx";
import LogIn from "./LogIn";
import Register from "./Register";
import { CustomLabelInput } from "./customLabelInput.tsx";

interface SidebarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
  labels: label[];
  setLabels: React.Dispatch<any>;
}

export default function Sidebar({username, setUsername, setIsAddingNote, labels, setLabels }: SidebarProps) {
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
      <button className="add-notes-btn" onClick={() =>setIsAddingNote(true)}>Add Note</button>
      <section className="login">
        <LogIn username={username} setUsername={setUsername}/>
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
