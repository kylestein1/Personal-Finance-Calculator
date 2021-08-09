import "./App.css";
import React, { useState, useEffect } from "react";
import Display from "./Display.js";
import Header from "./Header.js";
import CurrentBalance from "./CurrentBalance.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// {/* Header Component -> Login Button/Create User Button */}
// {/* Display Component -> Should display the table of Inflows/Outflows, Should also display the totals */}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);

  async function checkLoggedIn() {
    const response = await fetch("http://localhost:3001/api/login/me", {
      method: "GET",
      credentials: "include",
    });

    return response;
  }

  useEffect(() => {
    (async () => {
      const responseObj = await checkLoggedIn();
      const response = await responseObj.json();
      console.log({ response });
      if (response.loggedIn === true) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const responseObj = await getTransactions();
      const response = await responseObj.json();
      console.log({ response });
      setTransactions(response);
    })();
  }, [loggedIn]);

  async function getTransactions() {
    const response = await fetch(
      "http://localhost:3001/api/finance/transactions",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  }

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <CurrentBalance loggedIn={loggedIn} transactions={transactions} />
          </Col>
        </Row>
      </Container>
      <Display transactions={transactions} setTransactions={setTransactions} />
    </div>
  );
}

export default App;
