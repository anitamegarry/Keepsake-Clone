import React from "react";
import { useState } from "react";
import { label } from "../App.tsx";

interface customLabelInputProps {
  setLabels: React.Dispatch<any>;
  setIsEditLabels: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomLabelInput = ({
  setLabels,
  setIsEditLabels,
}: customLabelInputProps) => {
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
