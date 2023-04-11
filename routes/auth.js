const UserController = require("../controllers/user");
const router = require("express").Router();

router.post('/', UserController.login);
router.post('/create', UserController.create);
router.post('/refresh', UserController.refresh);

module.exports = router;
