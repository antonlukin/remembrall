const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Insert new message
  let sql = `INSERT INTO messages (message, chat, user, text) VALUES (?, ?, ?, ?)`;

  database.run(sql, [msg.message_id, msg.chat.id, msg.from.id, msg.text], (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}