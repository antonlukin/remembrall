module.exports = (ctx, database) => {
  let msg = ctx.message;
  let url = process.env.URL;

  // Make the url public
  let makePublic = (url) => {
    // Insert user info
    let sql = `UPDATE users SET public = 1 WHERE id = ?`;

    database.run(sql, [msg.from.id], (err) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      return ctx.reply("That's all. Keep your new public link: \n" + url);
    });
  };

   // Check if the url is public
   let checkPublic = () => {
    // Select user info by id
    let sql = `SELECT key, username, public FROM users WHERE id = ? LIMIT 1`;

    database.get(sql, [msg.from.id], (err, row) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      if (typeof row === 'undefined') {
        return ctx.reply("No link to update. Request geturl command first");
      }

      url = url + row.username;

      if (row.public == 1) {
        return ctx.reply("Your link already public. Here it is: \n" + url);
      }

      return makePublic(url);
    });
  }

  return checkPublic();
}