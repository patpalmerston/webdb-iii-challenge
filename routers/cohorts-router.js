const router = require('express').Router();

const knex = require("knex")
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)

// get database
router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => {
      res.status(500).json(cohorts)
    })
});

// get by ID
// router.get('/:id', (req, res) ={
//   db
// })


module.exports = router;