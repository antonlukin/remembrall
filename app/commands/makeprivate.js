module.exports = (ctx, database) => {
  let msg = ctx.message;

  // Make the url private
  const makePrivate = () => {
    return new Promise((resolve, reject) => {
      // Insert user info
      let sql = `UPDATE users SET public = 0 WHERE user = ?`;

      database.run(sql, [msg.from.id], (err) => {
        if (err) {
          reject(err.message);
        }

        resolve();
      });
    });
  }

  // Check if the url is private
  const getUser = () => {
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
        return ctx.reply("No link to update. Request remembrall url first");
      }

      let url = process.env.URL + user.username + '/' + user.key;

      if (user.public < 1) {
        return ctx.reply("Your link already private. Here it is: \n" + url)
      }

      makePrivate()
        .then(() => {
          ctx.reply("We are done. Your new private link here: \n" + url)
        })
        .catch(message => {
          ctx.error(message, ctx);
        })
    })
    .catch(message => {
      ctx.error(message, ctx);
    })
}