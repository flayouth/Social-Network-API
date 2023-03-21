//connection.js
const { connect, connection } = require('mongoose');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

mongoose.set('strictQuery', true);

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;