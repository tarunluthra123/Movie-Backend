exports.up = function(knex) {
  return knex.schema.alterTable('watchlist', t => {
    t.string('media');
  });
};


exports.down = function(knex) {
  return knex.schema.alterTable('watchlist', t => {
		t.dropColumn('media');
  });
};
