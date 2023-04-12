const WatchlistService = require("../services/watchlist.js");

class WatchlistController {
	static async getWatchlist(req, res) {
		const user = req.auth;
		const watchlist = await WatchlistService.getFromUser(user.id);
		res.status(200).send({ watchlist, details: "Success" });
	}

	static async addToWatchlist(req, res) {
		const user = req.auth;
		const { tmdb_id, media } = req.body;

		if (!tmdb_id || !media) {
			return res.status(400).send({
				msg: "ID or media type missing"
			});
		}

		try {
			await WatchlistService.addToWatchlist(user.id, req.body);
			res.status(201).send({ msg: "Success" });
		} catch (error) {
			res.status(404).send({
				error: "Could not update", details: error,
			});
		}
	}

	static async removeFromWatchlist(req, res) {
		const user = req.auth;
		const { tmdb_id, media } = req.body;

		if (!tmdb_id || !media) {
			return res.status(400).send({
				msg: "ID or media type missing"
			});
		}

		try {
			await WatchlistService.removeFromWatchlist(user.id, req.body);
			res.status(200).send({ msg: "Success" });
		} catch (error) {
			res.status(404).send({
				error: "Could not update", details: error,
			});
		}
	}
}

module.exports = WatchlistController;
