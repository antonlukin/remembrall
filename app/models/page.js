const onerror = require('http-errors')
const database = require('../database');

module.exports = (req, res, next) => {
  const getMessages = () => {
    return new Promise((resolve, reject) => {
      // Select message by user id
      let sql = `SELECT message, text, created FROM messages WHERE user = ? LIMIT 100`;

      database.get(sql, [req.user.id], (err, messages) => {
        if (err) {
          reject(err.message);
        }

        resolve(messages);
      });
    });
  }

  Promise.all([
      getMessages()
    ])
    .then(data => {
      console.log(data);
      next();
    })
    .catch(message => {
      return next(onerror(500, 'Strange server error. Try later.'));
    })
}