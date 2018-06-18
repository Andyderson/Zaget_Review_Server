const promise = require('bluebird');
const { Pool } = require('pg');

// const connect = 'postgres://localhost:5432/zaget';
// const db = pg(connect);

// const findOne = (id) => {
//   return db.any('SELECT * FROM reviews inner join descriptions ON (descriptions.place_id = reviews.place_id) WHERE descriptions.place_id = $1', id);
// };

const pool = new Pool ({
    database: 'zaget',
});

const fetchReviews = (id) => {
    const q = `select * from reviews where place_id = ${id}`;
    return pool.query(q);
};

const fetchDescriptions = (id) => {
    const q = `select * from descriptions where place_id = ${id}`;
    return pool.query(q);
}


exports.fetchReviews = fetchReviews;
exports.fetchDescriptions = fetchDescriptions;