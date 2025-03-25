import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";

export interface label {
  labelID: number;
  userID: number;
  labelName: string;
}

function App() {
  const [labels, setLabels] = useState<label[]>([]);
  const [username, setUsername] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const res = await fetch(`http://localhost:3000/labels`);
        if (!res.ok) throw new Error("Failed to fetch labels");
        const data = await res.json();
        setLabels(data);
      } catch (err) {
        console.error("Error fetching labels:", err);
      }
    };

    fetchLabels();
  }, []);

  return (
    <>
      <Navbar />
      <div className="sidebar-gallery">

        <Sidebar username={username} setUsername={setUsername} setIsAddingNote={setIsAddingNote} labels={labels} setLabels={setLabels}/>
        <Gallery username={username} isAddingNote={isAddingNote} setIsAddingNote={setIsAddingNote}/>

      </div>
    </>
  );
}

export default App;
