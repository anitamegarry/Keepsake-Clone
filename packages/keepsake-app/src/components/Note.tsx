import { useEffect, useState } from "react";
import "./Note.css";

export interface NoteProp {
  id: string;
  title: string;
  isChecklist: boolean;
  content: string | string[];
  labels: number[];
}

export interface LabelObj {
  id: string;
  userIDs: string[];
  noteIDs: string[];
  labelName: string;
}

export default function Note({ id, title, isChecklist, content }: NoteProp) {
  const [labelList, setLabelList] = useState([]);

  async function getLabels() {
    const response = await fetch("http://localhost:3000/labels");
    const allLabels = await response.json();

    const noteLabels = allLabels.filter((label: LabelObj) =>
      label.noteIDs.includes(id)
    );
    setLabelList(noteLabels);
  }

  useEffect(() => {
    getLabels();
  }, []);

  return (
    <section className="note">
      <div className="note-head">
        {labelList.map((label: LabelObj) => (
          <p>{label.labelName}</p>
        ))}
      </div>
      <div className="note-title">
        <h3>{title}</h3>
      </div>
      <div className="content">
        {isChecklist && typeof content == "object" ? (
          <div>
            {content.map((point) => {
              return (
                <label className="check-container">
                  <input type="checkbox" />
                  {point}
                </label>
              );
            })}
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className="note-foot">
        <div className="buttons">
          <button>Delete</button>
          <button>Edit</button>
        </div>
        <p>semantic label</p>
      </div>
    </section>
  );
}
