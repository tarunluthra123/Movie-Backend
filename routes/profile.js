const router = require("express").Router();
const UserController = require("../controllers/user");

router.get('/', UserController.profile);

module.exports = router;
