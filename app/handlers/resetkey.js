const nanoid = require('nanoid');
const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Update user key
  const resetKey = (key) => {
    return new Promise((resolve, reject) => {
      // Insert user info
      let sql = `UPDATE users SET key = ? WHERE user = ?`;

      database.run(sql, [key, msg.from.id], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  // Try to find user in database
  const findKey = () => {
    return new Promise((resolve, reject) => {
      // Select user info by id
      let sql = `SELECT key, username, public FROM users WHERE user = ? LIMIT 1`;

      database.get(sql, [msg.from.id], (err, user) => {
        if (err) {
          reject(err.message);
        }

        resolve(user);
      });
    });
  }

  findKey()
    .then(user => {
      if (!user) {
        return ctx.reply('No key to reset. Request remembrall link first');
      }

      const custom = nanoid.customAlphabet('0123456789abcdef', 32);

      // Set new random key
      const key = custom();

      resetKey(key)
        .then(() => {
          let url = process.env.URL + user.username;

          if (user.public > 0) {
            return ctx.reply('Your key was reset but the link still public: \n' + url);
          }

          url = url + '/' + key;

          ctx.reply('Your key was reset. Here is your new link: \n' + url);
        })
        .catch(message => {
          ctx.error(message, ctx);
        })
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}