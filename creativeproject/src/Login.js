import React,{useState} from "react"
function Login(){
const[password, setPassword] = useState("");
const[username, setUsername] = useState("");

    async function handleLogin(event){

        event.preventDefault();

        const data = {username: username, password: password};
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers:{'Content-Type':'application/json'}
        })

        const responseObj = await response.json();
        console.log(responseObj);
    }

    return(
        <div className="Login">
            
        </div>
    )
}

export default Login