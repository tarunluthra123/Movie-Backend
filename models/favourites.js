const knex = require('../db/knex');

/**
 * @typedef {Object} Favourites
 * @property {number} id
 * @property {number} user_id
 * @property {number} tmdb_id
 * @property {date} created_at
 * @property {date} updated_at
 *
 * @returns {Knex.QueryBuilder<Watchlist, {}>}
 */
const Favourites = () => knex('favourites');

module.exports = Favourites;
