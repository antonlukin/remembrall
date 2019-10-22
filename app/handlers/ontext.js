const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;
  let text = msg.text;

  // Insert new message
  let sql = `INSERT INTO messages (message, chat, user, text) VALUES (?, ?, ?, ?)`;

  database.run(sql, [msg.message_id, msg.chat.id, msg.from.id, text], (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}