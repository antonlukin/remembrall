const onerror = require('http-errors')
const database = require('../database');

module.exports = (req, res, next) => {
  const username = req.params.username;
  const key = req.params.key;

  const findUser = () => {
    return new Promise((resolve, reject) => {
      // Select user info by id
      let sql = `SELECT user AS id, public, key FROM users WHERE username = ? LIMIT 1`;

      database.get(sql, [username], (err, user) => {
        if (err) {
          reject(err.message);
        }

        resolve(user);
      });
    });
  }

  findUser()
    .then(user => {
      if (!user) {
        return next(onerror(403, 'Incorrect link. Maybe user has not created it yet?'));
      }

      // If key not match for private user
      if (user.public < 1 && user.key !== key) {
        return next(onerror(401, 'User private key is not correct.'));
      }

      // Redirect public requests with key
      if (user.public > 0 && key) {
        return res.redirect('/' + username);
      }

      req.user = user;
      return next();
    })
    .catch(message => {
      return next(onerror(500, 'Strange server error. Try later.'));
    })
}