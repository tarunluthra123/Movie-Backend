const router = require("express").Router();

const watchlistRouter = require("./watchlist");
const favouritesRouter = require("./favourites");

router.use("/watchlist", watchlistRouter);
router.use("/favourites", favouritesRouter);

module.exports = router;
