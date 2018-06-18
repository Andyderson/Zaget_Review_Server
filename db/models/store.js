const mongoose = require('mongoose');

// const mongoUrl = 'mongodb://localhost/apateez-reviews';
const mongoUrlDocker = 'mongodb://zagetreviews:zagetreviews@18.144.28.155/admin';
// const mongoENV = process.env.MONGO_URI;

// mongoose.connect(mongoUrl); // Try localhost fisrst
mongoose.connect(mongoUrlDocker);
// mongoose.connect(mongoENV);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

const storeSchema = mongoose.Schema({
  place_id: {
    type: Number,
    unique: true,
  },
  name: String,
  price_level: Number,
  neighborhood: String,
  reviews: [
    [],
  ],
  city: String,
  street: String,
  rating: Number,
});

const Store = mongoose.model('Store', storeSchema);

const findOne = (id, callback) =>
  Store.find({ place_id: id }, callback);
const insertOne = (store, callback) => {
  Store.create(store, callback);
};

const clearDb = (cb) => {
  Store.remove({}, cb);
};


exports.findOne = findOne;
exports.insertOne = insertOne;
exports.clearDb = clearDb;
