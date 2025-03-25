import { useState } from "react";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
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
    console.log(await response.json());
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
