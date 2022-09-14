const express = require('express')
const { insertItem,  getPelis, getPelisHardcodeado, getPelisRandom } = require('./db')
const Ajv = require("ajv")
const ajv = new Ajv()

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


// Obtener las peliculas solicitadas
router.get('/peliculas-random', (req, res) => {
  getPelisRandom()
    .then((items) => {
      items = items.map((item) => ({
        title: item.title || null,
        year: item.year || null ,
        fullplot: item.fullplot || null,
        poster: item.poster || null,
        cast: item.cast || null,
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

  const result = ajv.validate(peliculaSchema, item)
  if (!result) {
    console.log(ajv.errors)
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

const peliculaSchema = {
  type: "object",
  properties: {
    title: {type: "string"},
    fullplot: {type: "string"},
    cast: {type: "array"},
    poster: {type: "string"},
    year: {type: "integer"},
  },
  required: ["title", "year"]
}

module.exports = router
