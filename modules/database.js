const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database(__dirname + '/../database/remembrall.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

module.exports = database;