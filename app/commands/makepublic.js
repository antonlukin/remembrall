module.exports = (ctx, database) => {
  let msg = ctx.message;

  // Make the url public
  const makePublic = () => {
    return new Promise((resolve, reject) => {
      // Insert user info
      let sql = `UPDATE users SET public = 1 WHERE user = ?`;

      database.run(sql, [msg.from.id], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  // Check if the url is public
  let getUser = () => {
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

  getUser()
    .then(user => {
      if (!user) {
        return ctx.reply('No link to update. Request geturl command first');
      }

      let url = process.env.URL + user.username;

      if (user.public > 0) {
        return ctx.reply('Your link already public. Here it is: \n' + url)
      }

      makePublic()
        .then(() => {
          ctx.reply('That’s all. Keep your new public link: \n' + url);
        })
        .catch(message => {
          ctx.error(message, ctx);
        })
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}