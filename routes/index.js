const router = require("express").Router();

router.get("/abc", (req, res) => {
    res.send({ msg: "fuck yeah" });
});

module.exports = router;
