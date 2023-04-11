const knex = require('../db/knex');

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} password
 * @property {string} name
 * @property {string} email
 * @property {date} created_at
 * @property {date} updated_at
 *
 * @returns {Knex.QueryBuilder<User, {}>}
 */
const Users = () => knex('users');

module.exports = Users;
