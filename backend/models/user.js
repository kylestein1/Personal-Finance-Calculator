const db = require("./mongodb-connection");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  displayName: String,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = db.model("User", userSchema);
