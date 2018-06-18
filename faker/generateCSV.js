const faker = require('faker');
const fs = require('fs');

faker.locale = 'en_US';

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Faker Generation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const product = {};

const createReviews = (index) => {
  product.place_id = index;
  product.name = faker.company.companyName().replace(',', '');

  product.reviews = [];
  for (let j = 0; j < Math.floor(Math.random() * (8 - 1) + 1); j++) {
    product.reviews.push({
      author_name: `${faker.name.firstName()}${faker.name.lastName()}`,
      profile_photo_url: faker.image.avatar(),
      rating: Number((Math.random() * 5).toFixed(0)),
      text: faker.lorem.sentences(),
      relative_time_description: faker.date.recent(),
    });
  }

  product.rating = Number((Math.random() * 5).toFixed(1));
  product.price_level = Math.floor(Math.random() * (4 - 1) + 1);
  product.neighborhood = faker.address.county();
  product.city = faker.address.city();
  product.street = faker.address.streetName();
  return product;
};

//<<<<<<<<<<<<<<< CSV Generation >>>>>>>>>>>>>>>>>>>



//<<<<<<<<<<<<<<<<<<<<<<<<<<< Generate CSV Description >>>>>>>>>>>>>>>>>>>>>>>>>>>

const generateDescriptionCSV = (number, writer, encoding, callback) => {
  let i = number;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const description = createReviews(i);
      const line = `${description.place_id},${description.name},${description.rating},${description.price_level},${description.neighborhood},${description.city},${description.street}\n`;
      if (i === 0) {
        writer.write(line, encoding, callback);
      } else {
        ok = writer.write(line, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

// generateDescriptionCSV(10, fs.createWriteStream('./abcd.csv'), 'utf8', () => {
//   console.log('WriteStream Complete');
// });

//<<<<<<<<<<<<<<<<<<<<<<<<<< Generate CSV Reviews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const generateReviewsCSV = (number, writer, encoding, callback) => {
  let i = number;
  let j = 0;
  let line;
  let reviewlines;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const review = createReviews(j);
      // console.log('reviews', createReviews(1).reviews);
      // review.reviews.forEach(review => {
        
      // })
      line = `${review.place_id},${review.author_name},${review.profile_photo_url},${review.rating},${review.text},${review.relative_time_description}\n`;
      
      if (i === 0) {
        writer.write(line, encoding, callback);
      } else {
        ok = writer.write(line, encoding);
        review.reviews.forEach(review => {
          writer.write()
        })
      }
      j++;
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

generateReviewsCSV(10, fs.createWriteStream('./abcdreviews.csv'), 'utf8', () => {
  console.log('WriteStream Complete');
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CSV Generation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let options = {
  autoClose: true
};

// let writeStream = fs.createWriteStream('description.csv', options);
// let i = 1;
// let write = function(counter) {
//   let ok = true;
//   while (i <= counter && ok) {
//     if (i === counter) {
//       writeStream.write(`${i}|${faker.company.companyName()}|${Number((Math.random() * 5).toFixed(1))}|${Math.floor(Math.random() * (4 - 1) + 1)}|${faker.address.county()}|${faker.address.city()}|${faker.address.streetName()} \n`);
//     } else {
//       ok = writeStream.write(`${i}|${faker.company.companyName()}|${Number((Math.random() * 5).toFixed(1))}|${Math.floor(Math.random() * (4 - 1) + 1)}|${faker.address.county()}|${faker.address.city()}|${faker.address.streetName()}\n`);
//     }
//     i++;
//   }
//   if (i <= counter) {
//     writeStream.once('drain', write);
//   }
// };
// write();

//<<<<<<<<<<<<<<<<<<<<<< Reviews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// const millionReviews = (counter) => {
//   let writeStream = fs.createWriteStream('abcdreviews.csv', options);
//   let i = 1;
//   let write = function() {
//     let ok = true;
//     while (i <= counter && ok) {
//       if (i === counter) {
//         writeStream.write(`${i}|${faker.name.firstName()}${faker.name.lastName()}|${faker.image.avatar()}|${Number((Math.random() * 5).toFixed(0))}|${faker.lorem.sentences()}|${faker.date.recent()} \n`);
//       } else {
//         ok = writeStream.write(`${i}|${faker.name.firstName()}${faker.name.lastName()}|${faker.image.avatar()}|${Number((Math.random() * 5).toFixed(0))}|${faker.lorem.sentences()}|${faker.date.recent()}\n`);
//       }
//       i++;
//     }
//     if (i <= counter) {
//       writeStream.once('drain', write);
//     }
//   };
//   write();
// }

// millionReviews(100);

module.exports.generateReviewsCSV = generateReviewsCSV;
module.exports.generateDescriptionCSV = generateDescriptionCSV;