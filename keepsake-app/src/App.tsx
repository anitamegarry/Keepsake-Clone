import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";

function App() {
  const [username, setUsername] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  return (
    <>
      <Navbar />
      <div className="sidebar-gallery">
        <Sidebar
          username={username}
          setUsername={setUsername}
          setIsAddingNote={setIsAddingNote}
        />
        <Gallery
          username={username}
          isAddingNote={isAddingNote}
          setIsAddingNote={setIsAddingNote}
        />
      </div>
    </>
  );
}

export default App;
