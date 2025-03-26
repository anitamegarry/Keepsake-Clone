import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Note from "./Note";
import { CustomLabelInput } from "./CustomLabelInput";
import { LabelObj } from "./Note.tsx";

interface NoteObj {
  id: string;
  title: string;
  isChecklist: boolean;
  content: string | string[];
  labels: number[];
}

interface GalleryProps {
  username: string;
  isAddingNote: boolean;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
}

async function getUserID(username: string) {
  try {
    const response = await fetch("http://localhost:3000/usernames");
    const users = await response.json();

    const user = users.find(
      (user: { username: string }) => user.username === username
    );
    return user ? user.id : null;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

export default function Gallery({
  username,
  isAddingNote,
  setIsAddingNote,
}: GalleryProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labels, setLabels] = useState<LabelObj[]>([]);
  const [notes, setNotes] = useState<NoteObj[]>([]);
  const [isAddingLabel, setIsAddingLabel] = useState(false);

  async function getNotes() {
    let response = await fetch(`http://localhost:3000/notes`);
    let data = await response.json();
    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function handleAddNoteClick() {
    const userID = await getUserID(username);

    const response = await fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        title,
        content,
        category: "note",
        isChecklist: false,
      }),
    });

    const newNote = await response.json();
    const noteID = newNote.id;

    if (noteID !== null) {
      for (const label of labels) {
        const res = await fetch(`http://localhost:3000/labels/${label.id}`);
        const existingLabel = await res.json();

        const currentNoteIDs: string[] = existingLabel.noteIDs || [];
        let currentUserIDs: string[] = existingLabel.userIDs || []; //might need to adjust this

        if (!currentUserIDs.includes(userID)) {
          currentUserIDs = [...currentUserIDs, userID];
        }

        if (!currentNoteIDs.includes(noteID)) {
          const updatedNoteIDs = [...currentNoteIDs, noteID];

          await fetch(`http://localhost:3000/labels/${label.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              noteIDs: updatedNoteIDs,
              userIDs: currentUserIDs,
            }),
          });
        }
      }
    }
    setNotes([...notes, newNote]);
    setIsAddingNote(false);
    setTitle("");
    setContent("");
  }

  function handleAddLabelClick() {
    setIsAddingLabel(true);
  }

  function handleConfirmLabelClick() {
    setIsAddingLabel(false);
  }

  return (
    <div className="gallery">
      <div className="add-new-note">
        {isAddingNote && (
          <div className="add-new-note">
            <textarea
              name="title"
              id="note"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <textarea
              name="content"
              id="note"
              placeholder="Take a note..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {isAddingLabel ? (
              <>
                <CustomLabelInput
                  setNoteLabels={setLabels}
                  username={username}
                  getUserID={getUserID}
                />{" "}
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

            <button onClick={handleAddNoteClick}>Submit</button>
          </div>
        )}
      </div>
      {notes.map((note: NoteObj) => {
        return (
          <Note
            id={note.id}
            title={note.title}
            isChecklist={note.isChecklist}
            content={note.content}
            labels={note.labels}
          />
        );
      })}
    </div>
  );
}
