// controllers/bookingController.js
const Booking = require('../models/Booking'),
      Event   = require('../models/Event'),
      QRCode  = require('qrcode');       // bonus

exports.getAll = async (req, res) => {
  res.json(await Booking.find({ user: req.user._id }).populate('event'));
};

exports.getOne = async (req, res) => {
  const b = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('event');
  res.json(b || { error: 'Not found' });
};

exports.create = async (req, res) => {
  const ev = await Event.findById(req.body.event);
  if (ev.bookedSeats + req.body.quantity > ev.seatCapacity)
    return res.status(400).json({ error: 'Not enough seats' });

  ev.bookedSeats += req.body.quantity;
  await ev.save();

  const booking = new Booking({ ...req.body, user: req.user._id });
  // bonus: generate QR
  if (process.env.QR_ENABLED === 'true') {
    booking.qrCode = await QRCode.toDataURL(`${booking.user}|${booking.event}|${Date.now()}`);
  }
  await booking.save();
  res.status(201).json(booking);
};
