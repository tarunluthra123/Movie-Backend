const router = require("express").Router();
const WatchlistController = require("../controllers/watchlist");


router.get("/", WatchlistController.getWatchlist);
router.post('/', WatchlistController.addToWatchlist);
router.delete('/', WatchlistController.removeFromWatchlist);

module.exports = router;
