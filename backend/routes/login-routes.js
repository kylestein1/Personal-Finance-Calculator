const express = require("express");

const LoginRegistrationController = require("../controllers/login-registration-controller");
const protect = require("../controllers/auth-controller");

const router = express.Router();
const loginRegistrationController = new LoginRegistrationController();

router.route("/").post(loginRegistrationController.login);

router.route("/register").post(loginRegistrationController.register);

//demonstrate protection of certain endpoints
router.route("/me").get(protect, function (req, res, next) {
  console.log(req.User);
  return res.status(200).json({ message: "user logged in", loggedIn: true });
});

router.route("/logout").post(protect, loginRegistrationController.logout);
module.exports = router;
