import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      displayName: displayName,
    };
    const response = await fetch("http://localhost:3001/api/login/register", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    setUsername("");
    setPassword("");
    setDisplayName("");

    const responseObj = await response.json();
    console.log(responseObj.message);
    console.log(response.status);
    if (response.status === 200) {
      props.setLoggedIn(true);
      props.setOpenReg(false);
    }
  }

  return (
    <div className="register">
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="display name"
            onChange={(event) => setDisplayName(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default Register;
