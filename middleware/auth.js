// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select('-password');
    next();
  } catch {
    res.status(401).json({ error: 'Token invalid' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admin resource' });
  next();
};
