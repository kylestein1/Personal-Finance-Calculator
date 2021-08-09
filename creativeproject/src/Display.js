import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import DeleteTrans from "./DeleteTrans.js";
import EditTrans from "./EditTrans.js";

function Display({ transactions, setTransactions }) {
  let outflowList;
  let inflowList;
  let displayOutFlowList;
  let displayInFlowList;
  console.log(transactions);
  if (transactions.length > 0) {
    outflowList = transactions.filter((transaction) => transaction.amount < 0);
    inflowList = transactions.filter((transaction) => transaction.amount > 0);

    displayOutFlowList = outflowList.map((outflow) => {
      return (
        <ListGroup.Item
          key={outflow._id}
          variant={
            outflow.category === "Food"
              ? "success"
              : outflow.category === "Work"
              ? "primary"
              : "danger"
          }
        >
          <div style={{ display: "flex" }}>
            <span>
              {outflow.description} {outflow.amount}
            </span>

            <EditTrans
              id={outflow._id}
              setTransactions={setTransactions}
            ></EditTrans>
            <DeleteTrans
              id={outflow._id}
              setTransactions={setTransactions}
            ></DeleteTrans>
          </div>
        </ListGroup.Item>
      );
    });

    displayInFlowList = inflowList.map((inflow) => {
      return (
        <ListGroup.Item
          key={inflow._id}
          variant={
            inflow.category === "Food"
              ? "success"
              : inflow.category === "Work"
              ? "primary"
              : "danger"
          }
        >
          <div style={{ display: "flex" }}>
            <span>
              {inflow.description} {inflow.amount}
            </span>
            <EditTrans
              id={inflow._id}
              setTransactions={setTransactions}
            ></EditTrans>
            <DeleteTrans
              id={inflow._id}
              setTransactions={setTransactions}
            ></DeleteTrans>
          </div>
        </ListGroup.Item>
      );
    });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>Inflows</Col>
          <Col>Outflows</Col>
        </Row>

        <Row>
          <Col>
            <ListGroup>{displayInFlowList}</ListGroup>
          </Col>
          <Col>
            <ListGroup>{displayOutFlowList}</ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Display;
