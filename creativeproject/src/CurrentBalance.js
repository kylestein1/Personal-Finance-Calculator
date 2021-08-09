import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
function CurrentBalance({ loggedIn, transactions }) {
  const [balance, setBalance] = useState(0);

  async function getCurrentBalance() {
    const response = await fetch(
      `http://localhost:3001/api/finance//transactions/currentbalance`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const responseObj = await response.json();
    console.log(responseObj);
    if (response.status === 200) {
      setBalance(responseObj.results);
    }
  }

  useEffect(() => {
    (async () => {
      const responseObj = await getCurrentBalance();
    })();
  }, [loggedIn, transactions]);


  return(<Card.Title as="h4">
      Your Balance is: {balance}
  </Card.Title>
  )



}

export default CurrentBalance;
