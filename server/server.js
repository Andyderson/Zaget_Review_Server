// const newrelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;
const bodyParser = require('body-parser');

const Stores = require('./../db/models/store.js');

//<<<<<<<<<<<<<<<<<<<<<<<<<<< Express >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/restaurants', express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/loaderio-eb6ce3d6915d7a0377dcca6d8aae4f22', (req, res) => {
  res.send('loaderio-eb6ce3d6915d7a0377dcca6d8aae4f22');
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<< Redis Implementation >>>>>>>>>>>>>>>>>>>>>>

const redis = require('redis');
const redisPort = process.env.redisPort || 6379;
// const redisHost = '127.0.0.1' //Local
const redisHost = '52.53.153.86'; //Deployed
// const client = redis.createClient(redisPort); //Local
const client = redis.createClient({'host': redisHost, 'port': redisPort}); //Deployed

const fetchReviews = (req, res) => {
  let place_id = parseInt(req.params.id);
  Stores.findOne(place_id)
    .then((data) => {
      client.setex(place_id, 60*60, JSON.stringify(data[0]));
      res.send(data[0]);
    })
    .catch((err) => {
      console.log('fetchReviews error', err);
    })
};

const fetchCache = (req, res, next) => {
  let place_id = parseInt(req.params.id);
  client.get(place_id, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      console.log('Data not cached, fetchReviews');
      fetchReviews(req, res);
    }
  })
}

app.get('/api/restaurants/:id', fetchCache);

//<<<<<<<<<<<<<<<<<<<<<<<<<<< MongoDB >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// app.get('/api/restaurants/:id', (req, res) => {
//   const place_id = parseInt(req.params.id);
//   Stores.findOne(place_id)
//     .then((data) => {
//       console.log('this is data', data[0]);
//       res.status(200)
//       res.send(data[0]);
//     });
// });

// <<<<<<<<<<<<<<<<<<<<<<<<<<< Postgres >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const db = require('./../db/postgresQL/postgresQL.js');

// app.get('/api/restaurants/:id', (req, res) => {
//   const id = req.params.id;
//   let result;
//   db.fetchDescriptions(id)
//   .then((data) => {
//     result = data.rows[0];
//   })
//   .then(() => {
//     db.fetchReviews(id)
//     .then(data => {
//       console.log('data', data);
//       let reviews = [];
//       data.rows.forEach(review => reviews.push([review]))
//       result.reviews = reviews;
//       res.send(result);
//     })
//   })
// });

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.listen(port, () => {
  console.log(`server running at PORT: ${port}`);
});