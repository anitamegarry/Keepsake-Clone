import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <Navbar />
      <div className="sidebar-gallery">
        <Sidebar />
        <Gallery />
      </div>
    </>
  );
}

export default App;
