import { useState } from 'react';

interface AddNoteProps {
    noteID: number; 
    userID: number;
    title: string;
    content: string | string[];
    category: string; 
    labels: string;
    isChecklist: boolean;
}

function AddNote({noteID, userID, title, content, category, labels, isChecklist}: AddNoteProps) {
    // Posts a new note to the notes API

    async function handleAddNoteClick() {

    let response = await fetch(`http://localhost:3000/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          noteID,
          userID, 
          title, 
          content, 
          category, 
          labels, 
          isChecklist
        })
    })
    console.log(response)
  };
};
