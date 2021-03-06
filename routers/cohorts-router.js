const router = require('express').Router();

const knex = require("knex")
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)

const userError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
}

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
router.get('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .first()
    .then(cohort => {
      if(cohort) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({ message: 'Cohort not found' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'Cohort with that ID does not Exist' })
    })
});

// get each student with a certain cohort id to display
router.get('/:id/students', (req, res) => {
  db('cohorts')
    .innerJoin('students', 'cohorts.id', 'students.cohort_id')
    .select('cohorts.name', 'students.name')
    .where({cohort_id: req.params.id})
    .then(Student => {
      if(Student) {
        res.status(200).json(Student)
      } else {
        res.status(404).json({ message: 'Student not found' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'Student with that ID does not Exist' })
    })
});

router.post('/', (req, res) => {
  db('cohorts')
    .insert(req.body)
    .then(cohort => {
      const [id] = cohort;

      db('cohorts')
        .where({ id })
        .first()
        .then( cohort => {
          res.status(200).json(cohort)
        })
    })
    .catch(err => {userError(500, 'Cohort with that ID does not exist', err)
  })
});

router.put('/:id', (req,res) => {
  db('cohorts')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
      if(count > 0) {
        db('cohorts')
          .where({id: req.params.id})
          .first().
          then(cohort => {
            res.status(200).json(cohort)
          })
      } else {
        res.status(404).json({ message: 'Cohort not Found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'Cohort Id not found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


module.exports = router;