import { useState } from "react"

interface User {
      userID: number,
      username: string,
      password: string,
      id: string
}
interface LogInProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LogIn({username, setUsername}: LogInProps){
    
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
        {validated ? <p>Welcome, {username}!</p> : 
        <>
            <input placeholder="Username" value={username} type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
            <input placeholder="Password" value={password} type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={handleSubmit}>Log In</button>
        </>
        }
    </div>
}