// models/User.js
const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
});
module.exports = model('User', userSchema);
