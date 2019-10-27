const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Fix user name
  const fixName = (username) => {
    return new Promise((resolve, reject) => {
      // Update username
      let sql = `UPDATE users SET username = ? WHERE user = ?`;

      database.run(sql, [username, msg.from.id], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  // Set new username
  const username = msg.from.username || msg.from.id;

  fixName(username)
    .then(() => {
      ctx.reply('Username updated. Request new remembrall link');
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}