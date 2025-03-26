import { useState } from "react";
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
  const [username, setUsername] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar
        validated={validated}
        setValidated={setValidated}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <div className="sidebar-gallery">
        <Sidebar
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setIsAddingNote={setIsAddingNote}
          validated={validated}
          setValidated={setValidated}
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
