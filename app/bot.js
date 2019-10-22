const Telegraf = require('Telegraf');
const handlers = require('./handlers');

// Create telegraf instance
const bot = new Telegraf(process.env.TOKEN);

// Create context error handler
bot.context = {
  error: (message, ctx) => {
    ctx.reply('Strange server error. Try later');

    console.error(message);
  }
}

// Start command
bot.start((ctx) => {
  ctx.reply('Send me something and I will store it in my database');
});


// Listen for any text message
bot.on('text', handlers.ontext);

// Handle edited messages
bot.on('edited_message', handlers.edited);

// Get link command
bot.command('getlink', handlers.getlink);

// Set public link
bot.command('makepublic', handlers.makepublic);

// Set private link
bot.command('makeprivate', handlers.makeprivate);

// Reset private token
bot.command('resetkey', handlers.resetkey);

// Reset private token
bot.command('forget', handlers.forget);

module.exports = bot;