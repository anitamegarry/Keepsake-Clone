import "./Navbar.css";

interface NavbarProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  setUsername,
  validated,
  setValidated,
  setPassword,
}: NavbarProps) {
  function handleClick() {
    setUsername("");
    setPassword("");
    setValidated(false);
  }

  return (
    <div className="navbar">
      <section className="title-logo">
        <img aria-label="logo" src="Designer-removebg.png" alt="logo" />
        <h1 className="app-title">Keepsake</h1>
      </section>

      {validated ? (
        <button className="logout-btn" onClick={handleClick}>
          Log out
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
