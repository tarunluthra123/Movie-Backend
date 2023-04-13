const Favourites = require('../models/favourites');

class FavouritesService {
	static async getFromUser(userId) {
		const favourites = await Favourites().where('user_id', userId);
		return favourites;
	}

	static async addToFavourites(userId, item) {
		return Favourites().insert({
			user_id: userId,
			tmdb_id: item.tmdb_id,
			media: item.media,
		});
	}

	static async removeFromFavourites(userId, item) {
		return Favourites().where({
			user_id: userId,
			tmdb_id: item.tmdb_id,
			media: item.media,
		}).del();
	}
}

module.exports = FavouritesService;
