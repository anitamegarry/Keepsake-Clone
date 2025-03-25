import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <section className="title-logo">
        <img src="Designer-removebg.png" alt="logo" />
        <h1 className="app-title">Keepsake</h1>
      </section>

      <button className="logout-btn">Log out</button>
    </div>
  );
}
