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
        <Sidebar labels={labels} setLabels={setLabels} />
        <Gallery />
      </div>
    </>
  );
}

export default App;
