exports.up = knex => {
  return knex.schema.createTable('favourites', t => {
    t.increments('id').primary().unsigned()
    t.integer('user_id').unsigned().references('id').inTable('users')
    t.integer('tmdb_id').unsigned()
		t.string('media')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('favourites')
}
