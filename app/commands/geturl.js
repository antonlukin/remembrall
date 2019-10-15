const nanoid = require('nanoid');

module.exports = (ctx, database) => {
  let msg = ctx.message;
  let url = process.env.URL;

  // Add new user
  let addUser = () => {
    // Set username
    let username = msg.from.username || '+' + msg.from.id;

    // Set key
    let key = nanoid(16);

    // Insert user info
    let sql = `INSERT INTO users (id, key, username) VALUES (?, ?, ?)`;

    database.run(sql, [msg.from.id, key, username], (err) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      url = url + username + '/' + key;

      return ctx.reply('Your remembrall private link: \n' + url);
    });
  };

  // Try to find user in database
  let findUser = () => {
    // Select user info by id
    let sql = `SELECT key, username, public FROM users WHERE id = ? LIMIT 1`;

    database.get(sql, [msg.from.id], (err, row) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      if (typeof row === 'undefined') {
        return addUser();
      }

      url = url + row.username;

      if (row.public > 0) {
        return ctx.reply('Your remembrall public link: \n' + url);
      }

      url = url + '/' + row.key;

      return ctx.reply('Your remembrall private link: \n' + url);
    });
  }

  return findUser();
}