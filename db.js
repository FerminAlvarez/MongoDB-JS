const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = (title) => {
  const filter = {
  'title':{$regex: new RegExp(title)}
  };
  const projection = {
    'title': 1, 
    'year': 1,
    'plot' : 1,
    'tomatoes': {
      'critic': {
        'rating': 1
      }
    },
    'imdb': {
      'rating': 1
    },
    'metacritic' : 1,
    'poster' : 1,
    '_id': 0
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}

const getPelisHardcodeado = () => {
  const filter = {
    'cast': {
      '$in': [
        'Bruce Willis'
      ]
    }, 
    'imdb.rating': {
      '$gte': 5
    }, 
    'genres': {
      '$in': [
        'Action'
      ]
    }, 
    'year': {
      '$lte': 2000
    }
  };
  const projection = {
    'title': 1, 
    'year': 1,
    'plot' : 1,
    'tomatoes': {
      'critic': {
        'rating': 1
      }
    },
    'imdb': {
      'rating': 1
    },
    'metacritic' : 1,
    'poster' : 1,
    '_id': 0
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


module.exports = { init, insertItem, getPelis, getPelisHardcodeado }
