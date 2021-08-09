import React, { useState, useEffect } from "react";
import "./Header.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Register from "./Register.js";
import AddTrans from "./AddTrans.js";

//show/hide the login form with the buttons (REACT BOOTSTRAP MODAL)
function Header({loggedIn, setLoggedIn, transactions, setTransactions}) {
  const [modalshow, setModalShow] = useState(false);
  const [showAddTransModal, setAddTrans] = useState(false);
  const [openRegister, setOpenReg] = useState(false);
  
  const closeModal = () => setModalShow(false);
  const openModal = () => setModalShow(true);

  const closeAddTModal = () => setAddTrans(false);
  const openAddTModal = () => setAddTrans(true);

  //setting a state whether or not the user is logged in
  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const data = { username: username, password: password };
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const responseObj = await response.json();
    console.log(responseObj);
    if (responseObj.message === "login worked") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  async function handleLogout(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/login/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const responseObj = await response.json();
    console.log(responseObj.message);
    if (responseObj.message === "logged out") {
      console.log("setting login = false");
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }

  return (
    <div className="header">
      <IconButton onClick={openModal}>
        <AccountBoxIcon fontSize="large" className="header_icon" />
      </IconButton>

      <Modal show={modalshow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login or Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loggedIn ? (
            openRegister ? (
              <Register setLoggedIn={setLoggedIn} setOpenReg={setOpenReg} />
            ) : (
              <Form onSubmit={handleLogin}>
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

                <Button className="mr-2" type="submit">
                  Login
                </Button>
                <Button onClick={(event) => setOpenReg(true)}>
                  Create Account
                </Button>
              </Form>
            )
          ) : (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </Modal.Body>
      </Modal>

      {loggedIn ? (
        <div className="addTrans">
          <IconButton onClick={openAddTModal}>
            <AddBoxIcon fontSize="large" className="header_icon" />
          </IconButton>

          <Modal show={showAddTransModal} onHide={closeAddTModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Transation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddTrans transactions={transactions} setTransactions={setTransactions}></AddTrans>
            </Modal.Body>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
