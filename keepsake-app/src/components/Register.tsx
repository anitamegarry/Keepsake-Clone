import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function validateDetails() {
    const ALPHA_SPACE_REGEX =
      /(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])/;
    return ALPHA_SPACE_REGEX.test(username) && ALPHA_SPACE_REGEX.test(username);
  }

  async function handleSubmit() {
    if (!validateDetails()) {
      throw new Error("Username and password invalid");
    }

    let response = await fetch(`http://localhost:3000/usernames`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: 1,
        username: username,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create an account");
    }
    setUsername("");
    setPassword("");
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
    </div>
  );
}
