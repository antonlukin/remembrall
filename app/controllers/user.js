module.exports = (database, req, res) => {
  return;

  // Find the user in database
  let checkLink = () => {
    // Select user and privacy by username
    let sql = `SELECT user, public FROM users WHERE username = ? LIMIT 1`;

    database.get(sql, [req.params.username], (err, row) => {
      if (err) {
        res.render('error', { error: "Can't process your request right now" });
      }

      if (typeof row === 'undefined') {
        return res.render('error', { error: "Unknown link. Maybe user has not created it yet" });
      }

      if (row.public == 0) {
        return res.render('error', { error: "This link must be requested with private key" });
      }

      return getRows(row.user);
    });
  }

  return checkLink();
}