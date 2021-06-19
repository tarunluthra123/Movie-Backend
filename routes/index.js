const router = require("express").Router();

const watchlistRouter = require("./watch");

router.use("/watch", watchlistRouter);

router.get("/abc", (req, res) => {
    res.send({ msg: "fuck yeah" });
});

module.exports = router;
