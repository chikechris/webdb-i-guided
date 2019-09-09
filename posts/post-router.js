const express = require('express')

// database access using knex
const db = require('../data/db-config.js')

const router = express.Router()

router.get('/', (req, res) => {
  db.select('*')
    .from('posts')
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db('posts')
    .where({ id }) // always returns an array
    .first() // picks the first element of the resulting array
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/', (req, res) => {
  // inserrt into post () values ()

  const postData = req.body

  db('posts')
    .insert(postData, 'id')
    .then(([id]) => {
      db('posts')
        .where({ id })
        .first()
        .then(post => {})
        .catch(err => {
          res.json(err)
        })
    })
})

router.put('/:id', (req, res) => {
  const changes = req.body
  db('posts')
    .where('id', req.params.id)
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `deleted ${count} records` })
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete('/:id', (req, res) => {
  db('posts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `deleted ${count} records` })
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router
