const loginRoute = require("./login");
const signupRoute = require("./signup");
const refreshRoute = require("./refresh");

const router = require("express").Router();

router.use("/", loginRoute);
router.use("/create", signupRoute);
router.use("/refresh", refreshRoute);

module.exports = router;
