exports.up = knex => {
  return knex.schema.createTable('watchlist', t => {
    t.increments('id').primary().unsigned()
    t.integer('user_id').unsigned().references('id').inTable('users')
    t.integer('tmdb_id').unsigned()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('watchlist')
}