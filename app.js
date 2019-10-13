/**
 * Remembrall telegram bot
 *
 * Store messages sent to bot in database
 *
 * @author Anton Lukin
 * @license MIT
 * @version 1.0.0
 */

process.env["NTBA_FIX_319"] = 1;

/**
 * Require settings
 */
require('dotenv').config();

/**
 * Add modules
 */
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const getUrls = require('get-urls');
const path = require('path');


/**
 * Create a bot that uses 'polling' to fetch new updates
 */
let bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

/**
 * Connect to database
 */
let database = new sqlite3.Database('./database/remebrall.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

/**
 * Create express instance
 */
let app = express();

/**
 * Create table if not exists
 */
database.run('CREATE TABLE IF NOT EXISTS messages (user INTEGER, url TEXT, text TEXT, created DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {
  if (err) {
    console.error(err.message);
  }
});

/**
 * Listen for any message
 */
bot.on('message', (msg) => {
  let url;

  // Get only first url from the message
  for (url of getUrls(msg.text)) {
    break;
  }

  let text = msg.text.replace(url, '');

  // Insert new message
  database.run(`INSERT INTO messages (user, url, text) VALUES(?, ?, ?)`, [msg.from.id, url, text], function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

/**
 * Express requests
 */
app.get('/data', (req, res) => {
  database.all(`SELECT url, text, created FROM messages WHERE user = ? ORDER BY created DESC`, [46342746], (err, rows) => {
    res.json(rows);
  });
});

/**
 *
 */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

/**
 * Let's start
 */
app.listen(process.env.PORT || 3000);