import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Note from "./Note";
import { CustomLabelInput } from "./Labels.tsx";
import { LabelObj } from "./Note.tsx";
import { getSemanticLabel } from "./SemanticLabel.tsx";

export interface NoteObj {
  id: string;
  title: string;
  isChecklist: boolean;
  content: string | string[];
  userID: string;
  semanticLabel: string;
}

interface GalleryProps {
  username: string;
  validated: boolean;
  isAddingNote: boolean;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: string;
  username: string;
}

async function getUserID(username: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_JSON_API_URL}/usernames`
    );
    const users = await response.json();
    const user = users.find((user: User) => user.username === username);
    return user ? user.id : "";
  } catch (error) {
    console.error("Error fetching users:", error);
    return "";
  }
}

export default function Gallery({
  username,
  validated,
  isAddingNote,
  setIsAddingNote,
}: GalleryProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labels, setLabels] = useState<LabelObj[]>([]);
  const [notes, setNotes] = useState<NoteObj[]>([]);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isChecklist, setIsChecklist] = useState(false);
  const [checklistContent, setChecklistContent] = useState<string[]>([]);
  const [checkInput, setCheckInput] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getUserID(username);
      if (id) {
        setUserID(id);
      }
    };

    fetchUserID();
  }, [username]);

  async function getNotes() {
    let response = await fetch(`${import.meta.env.VITE_JSON_API_URL}/notes`);
    let data = await response.json();
    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function handleAddNoteClick() {
    const userID = await getUserID(username);
    const semanticLabel = await getSemanticLabel(title, content);
    let contentValue = isChecklist ? checklistContent : content;
    console.log(contentValue);

    const response = await fetch(`${import.meta.env.VITE_JSON_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        title,
        content: contentValue,
        category: "note",
        isChecklist: isChecklist,
        semanticLabel,
      }),
    });

    const newNote = await response.json();
    const noteID = newNote.id;

    if (noteID !== null) {
      for (const label of labels) {
        const res = await fetch(
          `${import.meta.env.VITE_JSON_API_URL}/labels/${label.id}`
        );
        const existingLabel = await res.json();

        const currentNoteIDs: string[] = existingLabel.noteIDs || [];
        let currentUserIDs: string[] = existingLabel.userIDs || [];

        if (!currentUserIDs.includes(userID)) {
          currentUserIDs = [...currentUserIDs, userID];
        }

        if (!currentNoteIDs.includes(noteID)) {
          const updatedNoteIDs = [...currentNoteIDs, noteID];

          await fetch(
            `${import.meta.env.VITE_JSON_API_URL}/labels/${label.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                noteIDs: updatedNoteIDs,
                userIDs: currentUserIDs,
              }),
            }
          );
        }
      }
    }
    setNotes([...notes, newNote]);
    setIsAddingNote(false);
    setTitle("");
    setContent("");
    setChecklistContent([]);
  }

  function handleAddLabelClick() {
    setIsAddingLabel(true);
  }

  function handleConfirmLabelClick() {
    setIsAddingLabel(false);
  }

  function handleAddCheck() {
    setChecklistContent([...checklistContent, checkInput]);
    setCheckInput("");
  }

  return (
    <div className="gallery">
      {!validated ? (
        <h1>Please sign in to view your notes</h1>
      ) : (
        <>
          {isAddingNote && (
            <div className="add-new-note">
              <textarea
                data-testid="title"
                name="title"
                id="note"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>

              {!isChecklist ? (
                <textarea
                  data-testid="content"
                  name="content"
                  id="note"
                  placeholder="Take a note..."
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter your text"
                    value={checkInput}
                    onChange={(e) => setCheckInput(e.target.value)}
                  />
                  <button onClick={handleAddCheck}>Add</button>
                  <ul>
                    {checklistContent.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {isAddingLabel ? (
                <>
                  <CustomLabelInput setNoteLabels={setLabels} userID={userID} />
                  <button
                    className="add-label-btn"
                    onClick={handleConfirmLabelClick}
                  >
                    Confirm labels
                  </button>
                </>
              ) : (
                <button className="add-label-btn" onClick={handleAddLabelClick}>
                  Add labels
                </button>
              )}

              <div className="add-note-foot">
                <button data-testid="submit" onClick={handleAddNoteClick}>
                  Submit
                </button>
                <div className="checkbox-status">
                  <input
                    checked={isChecklist}
                    onChange={() => setIsChecklist(!isChecklist)}
                    name="checkbox-status"
                    type="checkbox"
                  />
                  <label htmlFor="checkbox-status">check list?</label>
                </div>
              </div>
            </div>
          )}

          {notes.map((note: NoteObj) => {
            console.log(note.semanticLabel);
            return (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                isChecklist={note.isChecklist}
                content={note.content}
                userID={note.userID}
                getNotes={getNotes}
                semanticLabel={note.semanticLabel}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
