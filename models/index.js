const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-cities-sei5';

mongoose.connect(DB_URI, {
  // Optional deprecation warning fixes
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
// .then() allows us to accept the data or result of above method at a later time.
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((error) => console.log(error));


  module.exports = {
    User: require('./User'),
  };