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
        console.log(users)
        let match = false;
        users.map((user) => {
            (username == user.username && password == user.password) ?  match = true : null
        })
        setValidated(match)
    }

    return <div>
        <h3>Log In</h3>
        {validated ? <p>Logged in</p> : <>
        <label htmlFor="username">Username</label>
        <input value={username} type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input value={password} type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
        <button onClick={handleSubmit}>Log In</button>
        </>
        }
    </div>
}