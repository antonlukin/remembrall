const express = require('express');

const database = require('./database');
const controllers = require('./controllers');

// Create express instance
const app = express();

// Set views engine and templates path
app.set('view engine', 'pug');
app.set('views', __dirname + '/../templates');

// Set static public folder
app.use(express.static(__dirname + '/../public'));

// Process private user links
app.get('/:username/:key([a-z0-9_-]{32})?', (req, res) => {
  controllers.user(database, req, res);
});

// Show home page
app.get('/', (req, res, next) => {
  res.render('home');
});

// Show 404 error
app.use((req, res) => {
  res.status(404);

  res.render('error', {
    'title': 'Page not found',
    'message': 'We’re sorry, we seem to have lost this page, but we don’t want to lose you. Use the links below to find answers to your questions.'
  });
});

module.exports = app;