const knex = require('knex');
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development'];

module.exports = knex(knexConfig);
