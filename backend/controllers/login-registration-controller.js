const User = require("../models/user");
const JWT = require("jsonwebtoken");

function signToken(id) {
  return JWT.sign({ id }, "random", { expiresIn: "1d" });
}

class UserRegistrationController {
  async login(req, res, next) {
    const { username, password } = req.body;
    if (!password) {
      return res.json({ message: "error finding user" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "error finding user" });
    }

    if (await user.comparePassword(password)) {
      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      const token = signToken(user._id);
      return res
        .status(200)
        .cookie("JWT", token, cookieOptions)
        .json({ message: "login worked" });
    }
  }
  async register(req, res, next) {
    const { username, password, displayName } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    try {
      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      const newUser = await User.create({ username, password, displayName });
      const token = signToken(newUser._id);
      return res
        .status(200)
        .cookie("JWT", token, cookieOptions)
        .json({ message: "register worked" });
    } catch (err) {
      return res.sendStatus(403);
    }
  }

  //Is this the best way to log a user out?
  async logout(req, res, next) {
    const cookieOptions = {
      //creating a token that expires yesterday and sending that to the frontend
      expires: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const token = signToken(req.User._id);
    console.log(req.User._id);

    return res
      .status(200)
      .cookie("JWT", token, cookieOptions)
      .json({ message: "logged out" });
  }
}

module.exports = UserRegistrationController;
