import { useState } from "react"

export default function LogIn(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(){
        let response = await fetch(`http://localhost:3000/usernames`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UserID: 1, username: username, password: password})
        })
        console.log(await response.json())

    }

    return <div>
        <h3>Sign Up</h3>
        <input value={username} type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor="username">Username</label>
        <input value={password} type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <button onClick={handleSubmit}>Register</button>
    </div>
}