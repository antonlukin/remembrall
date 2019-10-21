const Telegraf = require('Telegraf');
const getUrls = require('get-urls');
const hashtagRegex = require('hashtag-regex');

const database = require('./database');
const commands = require('./commands');

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
bot.command('getlink', (ctx) => {
  commands.getlink(ctx, database);
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

// Reset private token
bot.command('forget', (ctx) => {
  commands.forget(ctx, database);
});

// Handle edited messages
bot.on('edited_message', (ctx) => {
  let msg = ctx.update.edited_message;

  // Update message by id
  let sql = `UPDATE messages SET text = ? WHERE message = ? AND chat = ?`;

  database.run(sql, [msg.text, msg.message_id, msg.chat.id], (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

// Listen for any text message
bot.on('text', (ctx) => {
  let msg = ctx.message;
  let text = msg.text;

  // Let's parse urls
  let urls = getUrls(text);

  urls.forEach((url) => {
    // Add urls to db
    let sql = `INSERT INTO urls (message, chat, url) VALUES (?, ?, ?)`

    database.run(sql, [msg.message_id, msg.chat.id, url], (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    text = text.replace(url, '');
  });

  // Find all hashtags
  let tags = text.match(hashtagRegex());
  tags = new Set(tags);

  tags.forEach((tag) => {
    // Add tags to db
    let values = [msg.message_id, msg.chat.id, tag.substring(1)]

    database.run(`INSERT INTO tags (message, chat, tag) VALUES (?, ?, ?)`, values, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    text = text.replace(tag, '');
  });

  // Insert new message
  let sql = `INSERT INTO messages (message, chat, user, text) VALUES (?, ?, ?, ?)`;

  database.run(sql, [msg.message_id, msg.chat.id, msg.from.id, text], (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

module.exports = bot;