
const router = require("express").Router();


const authRouter = require("./auth");
const profileRouter = require("./profile");
const watchlistRouter = require("./watchlist");
const favouritesRouter = require("./favourites");

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use("/watchlist", watchlistRouter);
router.use("/favourites", favouritesRouter);

// Ping test for testing purposes
// Also useful for waking up the dyno on heroku before actual calls start coming in.
router.get("/ping", (req, res) => {
  return res.status(200).send({ msg: "Server up and running." });
});

module.exports = router;
