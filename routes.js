const express = require('express')
const { insertItem,  getPelis, getPelisHardcodeado } = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas
router.get('/peliculas', (req, res) => {
  let title = req.query.title
  getPelis(title)
    .then((items) => {
      items = items.map((item) => ({
        title: item.title || null,
        year: item.year || null ,
        plot: item.plot || null,
        poster: item.poster || null,
        imbd_rating : parseIMDBRating(item),
        tomatoes_rating : parseTomatoesRating(item),
        metacritic: item.metacritic || null,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

const parseIMDBRating = (item) => item.imdb === undefined ? null : 
 item.imdb.rating === undefined ? null : item.imdb.rating

const parseTomatoesRating = (item) => item.tomatoes === undefined ? null :
 item.tomatoes.critic === undefined ? null :
 item.tomatoes.critic.rating === undefined ? null : item.tomatoes.critic.rating

// Obtener las peliculas solicitadas
router.get('/peliculas-hardcodeado', (req, res) => {
  getPelisHardcodeado()
    .then((items) => {
      items = items.map((item) => ({
        title: item.title || null,
        year: item.year || null ,
        plot: item.plot || null,
        poster: item.poster || null,
        imbd_rating : parseIMDBRating(item),
        tomatoes_rating : parseTomatoesRating(item),
        metacritic: item.metacritic || null,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

// Postear una pelicula
router.post('/peliculas', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})


module.exports = router
