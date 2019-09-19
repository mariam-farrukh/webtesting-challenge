const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

function insert(user) {
  return db('users').insert(user, 'id');
}

function findById(id) {
  return db('users').where({ id });
}

function update(changes, id) {
  return db('users').where({ id }).update(changes);
}

function remove(id) {
  return db('users').where({ id }).delete(id);
}

function getAll() {
  return db('users');
}