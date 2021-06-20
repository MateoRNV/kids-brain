
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('age_levels').del()
    .then(function () {
      // Inserts seed entries
      return knex('age_levels').insert([
        {age: 5, level: '1'},
        {age: 6, level: '2'},
        {age: 7, level: '3'},
        {age: 8, level: '4'}
      ]);
    });
};
