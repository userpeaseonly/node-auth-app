const jwt = require('jsonwebtoken');
const { generateSecretKey } = require('./cryptoUtils');

// Generate dynamically unique secrets at runtime
const ACCESS_TOKEN_SECRET = generateSecretKey();
const REFRESH_TOKEN_SECRET = generateSecretKey();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
