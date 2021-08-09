import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

function EditTrans({ setTransactions, id }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [modalshow, setModalShow] = useState(false);
  const closeModal = () => setModalShow(false);
  const openModal = () => setModalShow(true);

  async function editTransaction(event) {
    event.preventDefault();

    const data = {
      amount: amount,
      description: description,
      category: category,
    };

    const response = await fetch(
      `http://localhost:3001/api/finance/transactions/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ data }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const responseObj = await response.json();
    if (response.status === 200) {
      setTransactions(responseObj.results);

      setAmount("");
      setDescription("");
      setCategory("");
    }
  }

  return (
    <div>
      <div className="edittransaction">
        <Modal show={modalshow} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit This Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editTransaction}>
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

              <Button type="submit">Edit Transaction</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <IconButton onClick={openModal}>
        <EditIcon></EditIcon>
      </IconButton>
    </div>
  );
}
export default EditTrans;
