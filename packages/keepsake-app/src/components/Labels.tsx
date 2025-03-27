import React from "react";
import { useState, useEffect } from "react";
import { LabelObj } from "./Note.tsx";

interface LabelProps {
  setNoteLabels: React.Dispatch<React.SetStateAction<LabelObj[]>>;
  userID: string;
}

export const CustomLabelInput = ({ setNoteLabels, userID }: LabelProps) => {
  const [inputValue, setInputValue] = useState("");
  const [labels, setLabels] = useState<LabelObj[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels`);
        if (!res.ok) throw new Error("Failed to fetch labels");
        const data = await res.json();
        console.log(data);
        const userLabels = data.filter((label: LabelObj) =>
          label.userIDs.includes(userID as string)
        );
        setLabels(userLabels);
      } catch (err) {
        console.error("Error fetching labels:", err);
      }
    };

    fetchLabels();
  }, [userID]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      try {
        const res = await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels`, {
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
      <label htmlFor="custom-label-input">
        Custom label:
        <input
          id="custom-label-input"
          data-testid="custom-label-input"
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
