const loginRoute = require("./login");
const signupRoute = require("./signup");

const router = require("express").Router();

router.use("/", loginRoute);
router.use("/create", signupRoute);

module.exports = router;
