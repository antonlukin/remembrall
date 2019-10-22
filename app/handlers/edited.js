const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.update.edited_message;

  // Update message by id
  let sql = `UPDATE messages SET text = ? WHERE message = ? AND chat = ?`;

  database.run(sql, [msg.text, msg.message_id, msg.chat.id], (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}