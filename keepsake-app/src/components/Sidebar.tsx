import "./Sidebar.css";
import LogIn from "./LogIn";
import Register from "./Register";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <button className="edit-labels-btn">Edit Labels</button>
      <button className="add-notes-btn">Add Note</button>
      <section className="login">
        <LogIn />
      </section>
      <section className="register">
        <Register />
      </section>
    </div>
  );
}
