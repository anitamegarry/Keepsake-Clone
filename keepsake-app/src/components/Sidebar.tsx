import "./Sidebar.css";
import LogIn from "./LogIn";
import Register from "./Register";

interface SidebarProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  username,
  setUsername,
  password,
  setPassword,
  setIsAddingNote,
  validated,
  setValidated,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <button data-testid="add-note" className="add-notes-btn" onClick={() => setIsAddingNote(true)}>
        Add Note
      </button>
      <section className="login">
        <LogIn
          validated={validated}
          setValidated={setValidated}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
