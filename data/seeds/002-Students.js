
  
  exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('cohorts').insert([
      {cohort_id: 1, name: 'I am a student'}
    
    ])
  };

