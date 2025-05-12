// controllers/eventController.js
const Event = require('../models/Event');
exports.getAll = async (req, res) => {
  const { category, date } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (date)     filter.date = new Date(date);
  res.json(await Event.find(filter));
};
exports.getOne = async (req, res) => {
  res.json(await Event.findById(req.params.id));
};
exports.create = async (req, res) => {
  res.status(201).json(await Event.create(req.body));
};
exports.update = async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if (req.body.seatCapacity < ev.bookedSeats)
    return res.status(400).json({ error: 'Capacity below bookings' });
  res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};
exports.remove = async (req, res) => {
  // Option: prevent delete if bookings exist
  // Or: await Booking.deleteMany({ event: req.params.id });
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
