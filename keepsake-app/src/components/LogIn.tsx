import { useState } from "react"

interface User {
      userID: number,
      username: string,
      password: string,
      id: string
}

export default function LogIn(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validated, setValidated] = useState(false)

    async function getUsers(){
        let response = await fetch(`http://localhost:3000/usernames`)
        let data: User[] = await response.json()
        return data
    }

    async function handleSubmit(){
        let users = await getUsers()
        users.map((user) => {
            (username == user.username && password == user.password) ? setValidated(true) : setValidated(false)
        })
    }

    return <div>
        <h3>Log In</h3>
        <input value={username} type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor="username">Username</label>
        <input value={password} type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <button onClick={handleSubmit}>Log In</button>
        {validated ? <p>Logged in</p> : <p></p>}
    </div>
}