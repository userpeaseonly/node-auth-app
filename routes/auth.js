const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/authMiddleware');
const { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET } = require('../utils/generateTokens');
const predefinedUsers = require('../predefinedUsers');

const router = express.Router();
router.use(cookieParser());

// Login API
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = predefinedUsers.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set refresh token in a secure cookie
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
});

// Check Auth API
router.get('/check-auth', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated' });
});

// Refresh Token API
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
    res.json({ accessToken: newAccessToken });
  });
});

module.exports = router;
