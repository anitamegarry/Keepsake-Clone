import { useEffect, useState } from "react";
import "./Note.css";
import { CustomLabelInput } from "./CustomLabelInput";
import { NoteObj } from "./Gallery.tsx";

interface NoteProp {
  id: string;
  title: string;
  isChecklist: boolean;
  content: string | string[];
  userID: string;
  getNotes: () => Promise<void>;
}

export interface LabelObj {
  id: string;
  userIDs: string[];
  noteIDs: string[];
  labelName: string;
}

export default function Note({
  id,
  title,
  isChecklist,
  content,
  userID,
  getNotes,
}: NoteProp) {
  const [labelList, setLabelList] = useState<LabelObj[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

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

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleFinishEditingClick() {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        category: "note",
        isChecklist: false,
      }),
    });
    const res = await response.json();
    console.log(res, "<---- note patch response");
    getNotes();
    setIsEditing(false);
  }

  return (
    <section className="note">
      {isEditing ? (
        <div className="edit-note">
          <textarea
            name="title"
            id="note"
            placeholder={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></textarea>
          <textarea
            data-testid="content"
            name="content"
            id="note"
            placeholder={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
          <CustomLabelInput setNoteLabels={setLabelList} userID={userID} />{" "}
          <button className="finish-editing" onClick={handleFinishEditingClick}>
            Finish Editing
          </button>
        </div>
      ) : (
        <>
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
              <button onClick={handleEditClick}>Edit</button>
            </div>
            <p>semantic label</p>
          </div>
        </>
      )}
    </section>
  );
}
