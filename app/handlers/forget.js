const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Check if the message replied
  if (typeof msg.reply_to_message === 'undefined') {
    return ctx.reply('Reply to the desired message with this command to delete')
  }

  // Try to remove the message
  const removeMessage = () => {
    return new Promise((resolve, reject) => {
      // Select user info by id
      let sql = `DELETE FROM messages WHERE message = ? AND chat = ?`;

      database.run(sql, [msg.reply_to_message.message_id, msg.chat.id], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  removeMessage()
    .then(() => {
      ctx.reply('Done. This message was removed from the database');
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}