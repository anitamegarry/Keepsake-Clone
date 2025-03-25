import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Note from "./Note";
import { CustomLabelInput } from "./CustomLabelInput";

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

export interface label {
  labelID: number;
  userID: number;
  labelName: string;
}

async function getUserID(username: string) {
  try {
    const response = await fetch("http://localhost:3000/usernames");
    const users = await response.json();

    const user = users.find(
      (user: { username: string }) => user.username === username
    );
    return user ? user.userID : null;
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
  const [labels, setLabels] = useState<label[]>([]);
  const [notes, setNotes] = useState([]);

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
        labels: labels,
        isChecklist: false,
      }),
    });

    console.log(response);
    setIsAddingNote(false);
    setTitle("");
    setContent("");
  }

  return (
    <div className="gallery">
      <div className="add-new-note">
        {isAddingNote && (
          <div className="add-new-note">
            <textarea
              data-testid="title" name="title"
              id="note"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <textarea
              data-testid="content" name="content"
              id="note"
              placeholder="Take a note..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <CustomLabelInput
              setNoteLabels={setLabels}
              username={username}
              getUserID={getUserID}
            />

            <button data-testid="submit" onClick={handleAddNoteClick}>Submit</button>
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
