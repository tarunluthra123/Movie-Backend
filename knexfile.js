const Config = require('./config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: Config.DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${ __dirname }/db/migrations`
    }
  },
  production: {
    client: 'postgresql',
    connection: Config.DB_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
