import React from "react";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery">
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
