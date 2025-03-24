import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";

function App() {

  const [username, setUsername] = useState("")

  return (
    <>
      <Navbar />
      <div className="sidebar-gallery">
        <Sidebar username={username} setUsername={setUsername}/>
        <Gallery />
      </div>
    </>
  );
}

export default App;
