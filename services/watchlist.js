const Watchlist = require('../models/watchlist');

class WatchlistService {
	static async getFromUser(userId) {
		const watchlist = await Watchlist().where('user_id', userId);
		return watchlist;
	}

	static async addToWatchlist(userId, item) {
		return Watchlist().insert({
			user_id: userId,
			tmdb_id: item.tmdb_id,
			media: item.media,
		});
	}

	static async removeFromWatchlist(userId, item) {
		return Watchlist().where({
			user_id: userId,
			tmdb_id: item.tmdb_id,
			media: item.media,
		}).del();
	}
}

module.exports = WatchlistService;
