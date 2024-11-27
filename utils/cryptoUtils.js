const crypto = require('crypto');

// Dynamically generate secrets for signing tokens
const generateSecretKey = () => crypto.randomBytes(32).toString('hex');

module.exports = { generateSecretKey };
