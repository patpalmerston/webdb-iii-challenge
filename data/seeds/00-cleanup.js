const cleaner = require('knex-cleaner');

exports.seed = function(knex, Promise) {
 //Deletes All Existing entries
  return cleaner.clean(knex);// cleans all tables and resets the primary keys
};