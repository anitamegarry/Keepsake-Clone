import { useState } from "react";
import "./Login.css";

export interface User {
  userID: number;
  username: string;
  password: string;
  id: string;
}
interface LogInProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validated: boolean;
  setValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogIn({
  username,
  setUsername,
  password,
  setPassword,
  validated,
  setValidated,
}: LogInProps) {
  const [errorMessage, setErrorMessage] = useState("");

  async function getUsers() {
    let response = await fetch(`${import.meta.env.VITE_JSON_API_URL}/usernames`);
    let data: User[] = await response.json();
    return data;
  }

  async function handleSubmit() {
    let users = await getUsers();
    let match = false;
    users.map((user) => {
      username == user.username && password == user.password
        ? (match = true)
        : null;
    });
    setValidated(match);
    !match
      ? setErrorMessage("Username or password incorrect")
      : setErrorMessage("");
  }

  return (
    <>
      <h3>Log In</h3>
      {validated ? (
        <p className="welcome-message">Welcome, {username}!</p>
      ) : (
        <>
          <div className="input-fields">
            <input
              placeholder="Username"
              value={username}
              type="text"
              name="username"
              data-testid="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              value={password}
              type="password"
              name="password"
              data-testid="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {errorMessage !== "" ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            <></>
          )}
          <button data-testid="login" onClick={handleSubmit}>
            Log In
          </button>
        </>
      )}
    </>
  );
}
