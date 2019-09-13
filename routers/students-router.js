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
  db('students')
    .then(students => {
      res.status(200).json(students)
    })
    .catch(err => {
      res.status(500).json(students)
    })
});

// get by ID
router.get('/:id', (req, res) => {
  db('students')
    .where({ cohort_id: req.params.id })
    .first()
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
  db('students')
    .insert(req.body)
    .then(Student => {
      const [id] = Student;

      db('students')
        .where({ id })
        .first()
        .then( Student => {
          res.status(200).json(Student)
        })
    })
    .catch(err => {userError(500, 'Student with that ID does not exist', err)
  })
});

router.put('/:id', (req,res) => {
  db('students')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
      if(count > 0) {
        db('students')
          .where({id: req.params.id})
          .first().
          then(Student => {
            res.status(200).json(Student)
          })
      } else {
        res.status(404).json({ message: 'Student not Found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  db('students')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'Student Id not found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


module.exports = router;