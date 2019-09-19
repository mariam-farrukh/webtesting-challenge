const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

function insert(user) {
//   return db('users').insert(user, 'id');
  return null;
}

function findById(id) {
//   return db('users').where({ id });
  return null;
}

function update(changes, id) {
//   return db('users').where({ id }).update(changes);
  return null;
}

function remove(id) {
//   return db('users').where({ id }).delete(id);
  return null;
}

function getAll() {
//   return db('users');
  return null;
}