const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Try to remove the message
  const removeMessage = (message, chat) => {
    return new Promise((resolve, reject) => {
      // Select user info by id
      let sql = `DELETE FROM messages WHERE message = ? AND chat = ? AND user = ?`;

      // Don't use fat arrow here to save this context
      database.run(sql, [message, chat, msg.from.id], function (err) {
        if (err) {
          reject(err.message);
        }

        resolve(this.changes);
      });
    });
  }

  // Prepare message to delete
  const prepareMessage = (message, chat) => {
    removeMessage(message, chat)
      .then((count) => {
        if (count > 0) {
          return ctx.reply('Done. This message was removed from the database');
        }

        ctx.reply('This message has already been deleted or you can’t access it');
      })
      .catch(message => {
        ctx.error(message, ctx);
      })
  }

  // Check if the message replied
  if (typeof msg.reply_to_message !== 'undefined') {
    return prepareMessage(msg.reply_to_message.message_id, msg.chat.id)
  }

  // Parse message
  let matches = msg.text.match(/#(\d+)-(\d+)$/);

  if (matches) {
    return prepareMessage(matches[2], matches[1]);
  }

  return ctx.reply('Reply to the desired message with this command to delete');
}
