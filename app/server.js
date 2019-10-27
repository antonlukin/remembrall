const express = require('express');
const models = require('./models');

// Create express instance
const app = express();

// Set views engine and templates path
app.set('view engine', 'pug');
app.set('views', __dirname + '/../templates');

// Set static public folder
app.use(express.static(__dirname + '/../public'));


// Show user link
app.get('/:username/:key([a-z0-9]{32})?', models.auth, models.page);


// Show home page
app.get('/', (req, res, next) => {
  res.render('home');
});


// Show server error
app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }

  res.status(err.status || 500);
  res.render('error', {
    'title': 'An error occurred',
    'message': err.message
  });

  if (err.console) {
    console.error(err.console);
  }
});


// Show 404 error
app.use(function(req, res) {
  res.status(404);
  res.render('error', {
    'title': 'Page not found',
    'message': 'The page you were looking for doesn’t exist.'
  });
});

module.exports = app;
