const express = require("express");
const protect = require("../controllers/auth-controller");

const FinanceController = require("../controllers/finance-controller");

const router = express.Router();

const financeController = new FinanceController();

router.route("/").get(financeController.getAllTransactions);

router
  .route("/transactions")
  .get(protect, financeController.getUserTransactions)
  .post(protect, financeController.createTrans);

router
  .route("/transactions/currentbalance")
  .get(protect, financeController.getCurrentBalance);
  
router
  .route("/transactions/:id")
  .get(protect, financeController.getSpecificTrans)
  .put(protect, financeController.updateTrans)
  .delete(protect, financeController.deleteTrans);

module.exports = router;
