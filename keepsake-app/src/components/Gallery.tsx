import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { CustomLabelInput } from "./CustomLabelInput";

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

            <CustomLabelInput
              setNoteLabels={setLabels}
              username={username}
              getUserID={getUserID}
            />

            <button onClick={handleAddNoteClick}>Submit</button>
          </div>
        )}
      </div>
      <section className="note">
        <h1>Note title</h1>
        <section className="note-content">
          <p>This is the notes content</p>
        </section>
      </section>
      <section className="note">
        <h1>Note title</h1>
        <section className="note-content">
          <p>This is the notes content</p>
        </section>
      </section>
    </div>
  );
}
