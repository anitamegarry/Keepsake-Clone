import React from "react";
import "./Gallery.css";


interface GalleryProps {
  isAddingNote: boolean;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Gallery({isAddingNote, setIsAddingNote}: GalleryProps) {

  return (
    <div className="gallery">
      <div className="add-new-note"></div>
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
