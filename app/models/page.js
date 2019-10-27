const onerror = require('http-errors');
const striptags = require('striptags');
const database = require('../database');

module.exports = (req, res, next) => {
  const getMessages = () => {
    return new Promise((resolve, reject) => {
      // Select message by user id
      let sql = `SELECT message, chat, text FROM messages WHERE user = ? ORDER BY created DESC LIMIT 250`;

      database.all(sql, [req.user.id], (err, items) => {
        if (err) {
          reject(err.message);
        }

        resolve(items);
      });
    });
  }

  const updateMessage = (item) => {
    item.id = item.chat + '-' + item.message;

    // Strip tags
    item.text = striptags(item.text, ['a', 'br', 'b', 'i', 'code', 'pre', 'button']);

    // Add break line tags
    item.text = item.text.replace(/\n/g, '<br>');

    return item;
  }

  getMessages()
    .then(items => {
      if (items.length < 1) {
        return next(onerror(404, 'The user has not added any messages yet.'));
      }

      items.forEach((item, i, array) => {
        array[i] = updateMessage(item);
      });

      let username = req.params.username;

      // Render options
      let options = {
        'items': items
      }

      if (/^[^\d]/.test(username)) {
        options.username = req.params.username;
      }

      res.render('page', options);
    })
    .catch(message => {
      next(onerror(500, 'Strange server error. Try later.', {
        'console': message
      }));
    })
}