/* eslint-disable no-console */
const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/musicBox';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connection to database was successful'))
  .catch(err => console.log('Error connecting to database\n', err));

mongoose.Promise = global.Promise;

module.exports = mongoose;
