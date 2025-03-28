import { useEffect, useState } from "react";
import "./Note.css";
import { CustomLabelInput } from "./Labels";

export interface NoteProp {
  id: string;
  title: string;
  isChecklist: boolean;
  content: string | string[];
  userID: string;
  getNotes: () => Promise<void>;
  semanticLabel: string;
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
  semanticLabel
}: NoteProp) {
  const [labelList, setLabelList] = useState<LabelObj[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [checkInput, setCheckInput] = useState("");

  async function getLabels() {
    const response = await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels`);
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

  function handleAddCheck() {
    if (Array.isArray(newContent)) {
      setNewContent([...newContent, checkInput]);
    }
    setCheckInput("");
  }

  async function handleFinishEditingClick() {
    await fetch(`${import.meta.env.VITE_JSON_API_URL}/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        category: "note",
        isChecklist: isChecklist,
      }),
    });

    const allLabelsRes = await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels`);
    const allLabels: LabelObj[] = await allLabelsRes.json();

    for (const label of allLabels) {
      const isInCurrentLabelList = labelList.some((l) => l.id === label.id);
      const isNoteLinked = label.noteIDs.includes(id);

      if (isNoteLinked && !isInCurrentLabelList) {
        const updatedNoteIDs = label.noteIDs.filter((noteId) => noteId !== id);
        await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels/${label.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteIDs: updatedNoteIDs,
          }),
        });
      }
    }

    for (const label of labelList) {
      const existingLabelRes = await fetch(
        `${import.meta.env.VITE_JSON_API_URL}/labels/${label.id}`
      );
      const existingLabel = await existingLabelRes.json();
      const currentNoteIDs: string[] = existingLabel.noteIDs || [];

      if (!currentNoteIDs.includes(id)) {
        const updatedNoteIDs = [...currentNoteIDs, id];
        await fetch(`${import.meta.env.VITE_JSON_API_URL}/labels/${label.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteIDs: updatedNoteIDs,
          }),
        });
      }
    }

    await getLabels();
    await getNotes();
    setIsEditing(false);
  }

  async function handleDeleteClick() {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Note deleted successfully");
      await getNotes();
    } else {
      console.error("Failed to delete note");
    }

    const allLabelsRes = await fetch("http://localhost:3000/labels");
    const allLabels: LabelObj[] = await allLabelsRes.json();

    for (const label of allLabels) {
      const isNoteLinked = label.noteIDs.includes(id);

      if (isNoteLinked) {
        const updatedNoteIDs = label.noteIDs.filter((noteId) => noteId !== id);
        await fetch(`http://localhost:3000/labels/${label.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteIDs: updatedNoteIDs,
          }),
        });
      }
    }
  }

  return (
    <section className="note">
      {isEditing ? (
        <div className="edit-note">
          <p>Title:</p>
          <textarea
            name="title"
            id="note"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></textarea>
          <p>Content:</p>
          {!isChecklist ? (
            <>
              <textarea
                data-testid="content"
                name="content"
                id="note"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
            </>
          ) : Array.isArray(newContent) ? (
            <>
              <input
                type="text"
                placeholder="Enter your text"
                value={checkInput}
                onChange={(e) => setCheckInput(e.target.value)}
              />
              <button onClick={handleAddCheck}>Add</button>
              <ul>
                {(Array.isArray(newContent) ? newContent : [newContent]).map((item: string) => (
                  <li>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
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
              <button onClick={handleDeleteClick}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
            </div>
            <p>{semanticLabel}</p>
          </div>
        </>
      )}
    </section>
  );
}
