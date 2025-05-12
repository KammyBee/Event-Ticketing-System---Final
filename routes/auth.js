// routes/auth.js
const r = require('express').Router(),
      { register, login } = require('../controllers/authController');
r.post('/register', register);
r.post('/login',    login);
module.exports = r;
