const { transaction } = require("../models/mongodb-connection");
const Transaction = require("../models/transaction");

class FinanceController {
  async getAllTransactions(req, res, next) {
    const results = await Transaction.find({});

    res.json(results);
  }

  //R IN CRUD DONE
  async getUserTransactions(req, res, next) {
    const results = await Transaction.find({ userId: req.User._id });
    return res.status(200).json(results);
  }

  //getting a specific transaction (must send query params in the pathway from the frontend to the backend)
  async getSpecificTrans(req, res, next) {
    const { id } = req.params;
    const results = await Transaction.findOne({
      _id: id,
      userId: req.User._id,
    });
    if (!results) {
      return res.json({ message: "no transaction" });
    }
    return res.status(200).json(results);
  }

  //pulling the id from the request params
  async deleteTrans(req, res, next) {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    const results = await Transaction.find({ userId: req.User._id });
    return res.status(200).json({ message: "delete successful", results });
  }

  //update the transaction
  async updateTrans(req, res, next) {
    const { id } = req.params;
    const { data } = req.body;
    await Transaction.findByIdAndUpdate(id, data, { new: true });
    const results = await Transaction.find({ userId: req.User._id });
    return res.json({ message: "update successful", results });
  }

  //create the transaction
  async createTrans(req, res, next) {
    const { User } = req;
    const { data } = req.body;
    data.userId = User._id;
    let results;
    try {
      results = await Transaction.create(data);
      return res.status(200).json({ message: "transaction created", results });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "transaction failed" });
    }
  }

  async getCurrentBalance(req, res, next) {
    const { User } = req;
    let currentBalance;
    let results;
    try{
        results = await Transaction.find({ userId: User._id });
    }
    catch(error){
        console.log(error);
        return res.status(400);
    }
    
    function balance(total, transaction){
        return total + transaction.amount;
    }
    currentBalance = results.reduce(balance, 0);
    return res.status(200).json({results: currentBalance});
  }
}
module.exports = FinanceController;
