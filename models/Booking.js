// models/Booking.js
const { Schema, model, Types } = require('mongoose');
const bookingSchema = new Schema({
  user:       { type: Types.ObjectId, ref: 'User', required: true },
  event:      { type: Types.ObjectId, ref: 'Event', required: true },
  quantity:   { type: Number, required: true },
  bookingDate:{ type: Date, default: Date.now },
  qrCode:     { type: String },  
});
module.exports = model('Booking', bookingSchema);
