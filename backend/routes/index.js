const express = require("express");

const router = express.Router();

router.use("/login", require("./login-routes"));
router.use("/finance", require("./finance-routes"));

module.exports = router;