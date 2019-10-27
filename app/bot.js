const Telegraf = require('telegraf');
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

// Get link command
bot.command('getlink', handlers.getlink);

// Set public link
bot.command('makepublic', handlers.makepublic);

// Set private link
bot.command('makeprivate', handlers.makeprivate);

// Fix username on update
bot.command('fixname', handlers.fixname);

// Reset private token
bot.command('resetkey', handlers.resetkey);

// Reset private token
bot.command('forget', handlers.forget);

// Handle edited messages
bot.on('edited_message', handlers.sanitize, handlers.edited);

// Listen for any text messages
bot.on('text', handlers.sanitize, handlers.ontext);

// Common handler
bot.on('message', (ctx) => {
  ctx.reply('This type of message is not supported at this moment');
});

module.exports = bot;
