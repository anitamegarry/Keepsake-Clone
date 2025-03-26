import { useState } from "react";

interface UserObj {
  username: string;
  password: string;
  id: string;
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getUsernames() {
    let response = await fetch(`http://localhost:3000/usernames`);
    let users = await response.json();
    let usernames: string[] = users.map((user: UserObj) => {
      return user.username;
    });
    return usernames;
  }

  async function validateDetails() {
    const USERNAME_REGEX = /[a-zA-Z0-9._]+(?<![_.])/;
    const usernames = await getUsernames();

    return USERNAME_REGEX.test(username) && !usernames.includes(username);
  }

  async function handleSubmit() {
    const isValid = await validateDetails();
    if (username == "" || password == "") {
      setErrorMessage("Please enter a username and password");
      return;
    }

    if (!isValid) {
      setErrorMessage("Username invalid or already taken");
      return;
    }

    let response = await fetch(`http://localhost:3000/usernames`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create an account");
    }
    setUsername("");
    setPassword("");
    setErrorMessage("");
    setSubmitted(true);
  }

  return (
    <div>
      <h3>Sign Up</h3>
      <div className="input-fields">
        <input
          placeholder="Username"
          value={username}
          type="text"
          name="username"
          onChange={(e) => {
            setSubmitted(false);
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          name="password"
          onChange={(e) => {
            setSubmitted(false);
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={handleSubmit}>Register</button>
      {submitted ? <p>Signed up!</p> : <></>}
      {errorMessage ? <p className="error-message">{errorMessage}</p> : <></>}
    </div>
  );
}
