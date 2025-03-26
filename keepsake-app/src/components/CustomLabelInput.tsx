import React from "react";
import { useState, useEffect } from "react";
import { LabelObj } from "./Note.tsx";

interface CustomLabelInputProps {
  setNoteLabels: React.Dispatch<React.SetStateAction<LabelObj[]>>;
  username: string;
  getUserID(username: string): Promise<any>;
}

export const CustomLabelInput = ({
  setNoteLabels,
  username,
  getUserID,
}: CustomLabelInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [labels, setLabels] = useState<LabelObj[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      const userID = await getUserID(username);
      try {
        const res = await fetch(`http://localhost:3000/labels`);
        if (!res.ok) throw new Error("Failed to fetch labels");
        const data = await res.json();
        console.log(data);
        const userLabels = data.filter((label: LabelObj) =>
          label.userIDs.includes(userID)
        );
        setLabels(userLabels);
      } catch (err) {
        console.error("Error fetching labels:", err);
      }
    };

    fetchLabels();
  }, [username]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const userID = await getUserID(username);
    if (event.key === "Enter" && inputValue.trim() !== "") {
      try {
        const res = await fetch(`http://localhost:3000/labels`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userIDs: [userID],
            labelName: inputValue,
            noteIDs: [],
          }),
        });

        if (!res.ok) throw new Error("Failed to post label");
        const data = await res.json();
        setLabels((prev: LabelObj[]) => [...prev, data]);
        setInputValue("");
      } catch (err) {
        console.error("Error posting label:", err);
      }
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    const selectedLabels = labels.filter((lbl) =>
      selectedOptions.includes(lbl.labelName)
    );
    setNoteLabels(selectedLabels);
  };

  return (
    <>
      <label>
        Custom label:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <select multiple={true} onChange={handleSelectChange}>
        {labels.map((label, idx) => (
          <option key={idx} value={label.labelName}>
            {label.labelName}
          </option>
        ))}
      </select>
    </>
  );
};
