const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Count all user messages
  const countMessages = () => {
    return new Promise((resolve, reject) => {
      // Select user info by id
      let sql = `SELECT COUNT(message) as count FROM messages WHERE user = ?`;

      database.get(sql, [msg.from.id], (err, row) => {
        if (err) {
          reject(err.message);
        }

        resolve(row);
      });
    });
  }

  countMessages()
    .then(row => {
      if (row && row.count > 250) {
        return ctx.reply('Sorry, you have reached the limit on the number of messages.')
      }

      let sql = `INSERT INTO messages (message, chat, user, text) VALUES (?, ?, ?, ?)`;

      database.run(sql, [msg.message_id, msg.chat.id, msg.from.id, msg.text], (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}