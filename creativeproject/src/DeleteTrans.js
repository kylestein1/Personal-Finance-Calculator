import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

function DeleteTrans({ setTransactions, id }) {
  async function deleteTransaction(event) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:3001/api/finance/transactions/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const responseObj = await response.json();
    if (response.status === 200) {
        setTransactions(responseObj.results); 
    }
  }

  return (
    <IconButton onClick={deleteTransaction}>
      <DeleteIcon></DeleteIcon>
    </IconButton>
  );
}
export default DeleteTrans;
