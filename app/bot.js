const Telegraf = require('Telegraf');

const database = require('./database');
const commands = require('./commands');

// Create telegraf instance
const bot = new Telegraf(process.env.TOKEN);

// Create context error handler
bot.context = {
  error: (err, ctx) => {
    ctx.reply('Strange server error. Try later');

    return console.error(err.message);
  }
}

// Start command
bot.start('start', (ctx) => {
  ctx.reply('Send me one link per message with optional description');
});

// Get link command
bot.command('geturl', (ctx) => {
  commands.geturl(ctx, database);
});

// Set public link
bot.command('makepublic', (ctx) => {
  commands.makepublic(ctx, database);
});

// Set private link
bot.command('makeprivate', (ctx) => {
  commands.makeprivate(ctx, database);
});

// Reset private token
bot.command('resetkey', (ctx) => {
  commands.resetkey(ctx, database);
});

// Listen for any text message
bot.on('text', (ctx) => {
  const msg = ctx.message;

  // Insert new message
  const sql = `INSERT INTO messages (id, user, text) VALUES (?, ?, ?)`;

  database.run(sql, [msg.message_id, msg.from.id, msg.text], function (err) {
    if (err) {
      return console.error(err.message);
    }
  });
});

module.exports = bot;