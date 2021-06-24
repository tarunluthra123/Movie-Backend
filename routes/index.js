const router = require("express").Router();

const watchlistRouter = require("./watchlist");
const favouritesRouter = require("./favourites");
const User = require("../models/User");

router.use("/watchlist", watchlistRouter);
router.use("/favourites", favouritesRouter);

// Ping test for testing purposes
// Also useful for waking up the dyno on heroku before actual calls start coming in.
router.get("/ping", (req, res) => {
    return res.status(200).send({ msg: "Server up and running." });
});

router.get("/user", async (req, res) => {
    const _id = req.user._id;
    const user = await User.findOne({ _id });
    res.json(user);
});

module.exports = router;
