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
app.get('/:username/:key([a-z0-9_-]{16})', (req, res) => {
  controllers.getprivate(database, req.params, res);
});

// Process public user links
app.get('/:username', (req, res) => {
  controllers.getpublic(database, req, res);
});

// Show index for all other requests
app.use((req, res) => {
  res.render('index');
});

module.exports = app;