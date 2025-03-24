import "./Sidebar.css";
import LogIn from "./LogIn";
import Register from "./Register";

export interface SidebarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({username, setUsername}: SidebarProps) {
  return (
    <div className="sidebar">
      <button className="edit-labels-btn">Edit Labels</button>
      <button className="add-notes-btn">Add Note</button>
      <section className="login">
        <LogIn username={username} setUsername={setUsername}/>
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
