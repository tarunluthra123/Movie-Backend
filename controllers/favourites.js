const FavouritesService = require("../services/favourites");

class FavouritesController {
	static async getFavourites(req, res) {
		const user = req.auth;
		const favourites = await FavouritesService.getFromUser(user.id);
		res.status(200).send({ favourites, details: "Success" });
	}

	static async addToFavourites(req, res) {
		const user = req.auth;
		const { tmdb_id, media } = req.body;

		if (!tmdb_id || !media) {
			return res.status(400).send({
				msg: "ID or media type missing"
			});
		}

		try {
			await FavouritesService.addToFavourites(user.id, req.body);
			res.status(201).send({ msg: "Success" });
		} catch (error) {
			res.status(404).send({
				error: "Could not update", details: error,
			});
		}
	}

	static async removeFromFavourites(req, res) {
		const user = req.auth;
		const { tmdb_id, media } = req.body;

		if (!tmdb_id || !media) {
			return res.status(400).send({
				msg: "ID or media type missing"
			});
		}

		try {
			await FavouritesService.removeFromFavourites(user.id, req.body);
			res.status(200).send({ msg: "Success" });
		} catch (error) {
			res.status(404).send({
				error: "Could not update", details: error,
			});
		}
	}
}

module.exports = FavouritesController;
