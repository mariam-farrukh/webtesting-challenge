exports.seed = function(knex) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { name: 'mariam' },
        { name: 'potato' },
        { name: 'heimer' }
      ]);
    });
};
