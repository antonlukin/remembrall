'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('messages', {
    message: {
      type: 'int'
    },
    chat: {
      type: 'int'
    },
    user: {
      type: 'int'
    },
    text: {
      type: 'text'
    },
    created: {
      type: 'text',
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, function (callback) {
    db.addIndex('messages', 'user', 'user', callback);
    db.addIndex('messages', 'message', ['message', 'chat'], true, callback);
  });

  db.createTable('users', {
    user: {
      type: 'int',
      unique: true
    },
    username: {
      type: 'text'
    },
    key: {
      type: 'text'
    },
    public: {
      type: 'int',
      defaultValue: 0
    }
  }, callback);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};