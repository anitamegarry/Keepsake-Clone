import "./Sidebar.css";
import LogIn from "./LogIn";
import Register from "./Register";
import { useState } from "react";

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
  const [loginToggled, setLoginToggled] = useState(true);

  return (
    <div className="sidebar">
      <button
        data-testid="add-note"
        className="add-notes-btn"
        onClick={() => {
          if (validated) {
            setIsAddingNote(true);
          }
        }}
      >
        Add Note
      </button>
      {loginToggled ? (
        <section className="login">
          <LogIn
            validated={validated}
            setValidated={setValidated}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setLoginToggled={setLoginToggled}
          />
        </section>
      ) : (
        <section className="register">
          <Register setLoginToggled={setLoginToggled} />
        </section>
      )}
    </div>
  );
}
