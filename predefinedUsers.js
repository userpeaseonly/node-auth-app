const bcrypt = require('bcryptjs');

const predefinedUsers = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) },
  { id: 3, username: 'user3', password: bcrypt.hashSync('password3', 10) },
  { id: 4, username: 'user4', password: bcrypt.hashSync('password4', 10) },
  { id: 5, username: 'user5', password: bcrypt.hashSync('password5', 10) },
];

module.exports = predefinedUsers;
