const Telegraf = require('Telegraf');
const getUrls = require('get-urls');
const nanoid = require('nanoid')

const database = require('./database');

const bot = new Telegraf(process.env.TOKEN, {
  polling: true
});

// Register user if need
bot.use((ctx, next) => {
  let token = nanoid(16), message = ctx.message;

  database.run('INSERT OR IGNORE INTO users (user, token) VALUES (?, ?)', [message.from.id, token], (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  return next(ctx);
});

// Start command
bot.command('start', (ctx) => {
  ctx.reply('Send me some links and I will store them in my database');
});

// Get link command
bot.command('link', (ctx) => {
  ctx.reply('Send me some links and I will store them in my database');
});

// Listen for any text message
bot.on('text', (ctx) => {
  let url, message = ctx.message;

  // Get only first url from the message
  for (url of getUrls(message.text)) {
    break;
  }

  let text = message.text.replace(url, '');

  // Insert new message
  database.run(`INSERT INTO messages (user, url, text) VALUES (?, ?, ?)`, [message.from.id, url, text], function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

module.exports = bot;