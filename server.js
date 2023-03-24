const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
}).on('error', (error) => {
  console.log('MongoDB connection error:', error);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at promise', promise, 'reason:', reason);
  process.exit(1);
});
