module.exports = (ctx, database) => {
  let msg = ctx.message;
  let url = process.env.URL;

  // Make the url private
  let makePrivate = (url) => {
    // Insert user info
    let sql = `UPDATE users SET public = 0 WHERE id = ?`;

    database.run(sql, [msg.from.id], (err) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      return ctx.reply("We are done. Your new private link here: \n" + url);
    });
  };

   // Check if the url is private
   let checkPrivate = () => {
    // Select user info by id
    let sql = `SELECT key, username, public FROM users WHERE id = ? LIMIT 1`;

    database.get(sql, [msg.from.id], (err, row) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      if (typeof row === 'undefined') {
        return ctx.reply("No link to update. Get remembrall url first");
      }

      url = url + row.username + '/' + row.key;

      if (row.public == 0) {
        return ctx.reply("Your link already private. Here it is: \n" + url);
      }

      return makePrivate(url);
    });
  }

  return checkPrivate();
}