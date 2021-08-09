const db = require("./mongodb-connection");

const mongoose = require("mongoose");

//add tagging functionality - tag different calendar events to correspond to different things
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  description: String,
  category: String,
});

module.exports = db.model("Transactions", transactionSchema);
