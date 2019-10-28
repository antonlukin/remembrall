const nanoid = require('nanoid/generate');
const database = require('../database');

module.exports = (ctx) => {
  let msg = ctx.message;

  // Add new user
  const addUser = (key, username) => {
    return new Promise((resolve, reject) => {
      // Insert user info
      let sql = `INSERT INTO users (user, key, username) VALUES (?, ?, ?)`;

      database.run(sql, [msg.from.id, key, username], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  // Try to find user in database
  const findUser = () => {
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

  findUser()
    .then(user => {
      if (user) {
        let url = process.env.URL + user.username;

        if (user.public > 0) {
          return ctx.reply('Your public remembrall link: \n' + url);
        }

        url = url + '/' + user.key;

        return ctx.reply('Your private remembrall link: \n' + url);
      }

      // Set username
      const username = msg.from.username || msg.from.id;

      // Set key
      const key = nanoid('0123456789abcdef', 32);

      addUser(key, username)
        .then(() => {
          let url = process.env.URL + username + '/' + key;

          ctx.reply('Your private remembrall link: \n' + url);
        })
        .catch(message => {
          ctx.error(message, ctx);
        })
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}