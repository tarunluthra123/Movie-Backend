exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.dropColumn('username');
    t.string('name')
  });
};


exports.down = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.string('username').unique().index();
    t.dropColumn('name');
  });
};
