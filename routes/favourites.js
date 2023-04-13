const router = require("express").Router();
const FavouritesController = require('../controllers/favourites');


router.get("/", FavouritesController.getFavourites);
router.post('/', FavouritesController.addToFavourites);
router.delete('/', FavouritesController.removeFromFavourites);

module.exports = router;
