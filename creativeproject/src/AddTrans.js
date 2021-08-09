import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddTrans({transactions, setTransactions}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  async function addTransaction(event) {
    event.preventDefault();

    const data = {
      amount: amount,
      description: description,
      category: category,
    };
    const response = await fetch(
      "http://localhost:3001/api/finance/transactions",
      {
        method: "POST",
        body: JSON.stringify({ data }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    setAmount("");
    setDescription("");
    setCategory("");

    const responseObj = await response.json();
    console.log(responseObj.results);
    console.log(response.status);
    if(response.status === 200){
        console.log(transactions);
        const updatedTransactions = [...transactions, responseObj.results]
        setTransactions(updatedTransactions)
    }
  }
  return (
    <div className="addtransaction">
      <Form onSubmit={addTransaction}>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            placeholder="amount in $$$"
            onChange={(event) => setAmount(parseInt(event.target.value))}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description/Name</Form.Label>
          <Form.Control
            type="text"
            value={description}
            placeholder="text"
            onChange={(event) => setDescription(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            placeholder="Category"
            onChange={(event) => setCategory(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Add Transaction</Button>
      </Form>
    </div>
  );
}

export default AddTrans;
