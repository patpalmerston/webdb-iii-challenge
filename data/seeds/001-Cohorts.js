
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').insert([
    {name: 'Web16'},
    {name: 'Web17'},
    {name: 'Web18'},
    {name: 'Web19'}
  ])
};
