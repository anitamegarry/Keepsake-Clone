import "./Sidebar.css";
import { useState, useEffect } from "react";
import { label } from "../App.tsx";
import LogIn from "./LogIn";
import Register from "./Register";        

interface sidebarProps {
  labels: label[];
  setLabels: React.Dispatch<any>;
}

export default function Sidebar({ labels, setLabels }: sidebarProps) {
  const [isEditLabels, setIsEditLabels] = useState(false);

  function handleEditLabelsClick() {
    setIsEditLabels(true);
  }

  const Input = () => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = async (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter" && inputValue.trim() !== "") {
        try {
          const newLabel = { labelName: inputValue };
          const res = await fetch(`http://localhost:3000/labels`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLabel),
          });

          if (!res.ok) throw new Error("Failed to post label");
          const data = await res.json();
          setLabels((prev: label[]) => [...prev, data]); //our post request only returns the new label not the list of labels
          setInputValue("");
          setIsEditLabels(false);
        } catch (err) {
          console.error("Error posting label:", err);
        }
      }
    };

    return (
      <label>
        Custom label:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
    );
  };

  return (
    <div className="sidebar">
      <button className="edit-labels-btn" onClick={handleEditLabelsClick}>
        Edit Labels
      </button>
      {isEditLabels && (
        <>
          <Input />
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
        <LogIn />
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
