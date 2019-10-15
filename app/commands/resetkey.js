const nanoid = require('nanoid');

module.exports = (ctx, database) => {
  let msg = ctx.message;

  // Update user key
  let resetKey = () => {
    // Set key
    let key = nanoid(16);

    // Insert user info
    let sql = `UPDATE users SET key = ? WHERE id = ?`;

    database.run(sql, [key, msg.from.id], (err) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      return ctx.reply('Your key reset. Request new remembrall link');
    });
  };

   // Try to find user in database
   let findKey = () => {
    // Select user info by id
    let sql = `SELECT key, username, public FROM users WHERE id = ? LIMIT 1`;

    database.get(sql, [msg.from.id], (err, row) => {
      if (err) {
        return ctx.error(err, ctx);
      }

      if (typeof row === 'undefined') {
        return ctx.reply('No key to reset. Request remembrall link first');
      }

      return resetKey();
    });
  }

  return findKey();
}