import "./Sidebar.css";
import LogIn from "./LogIn";
import Register from "./Register";

interface SidebarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  username,
  setUsername,
  setIsAddingNote,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <button className="add-notes-btn" onClick={() => setIsAddingNote(true)}>
        Add Note
      </button>
      <section className="login">
        <LogIn username={username} setUsername={setUsername} />
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
