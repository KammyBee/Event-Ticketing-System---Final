// routes/bookings.js
const r = require('express').Router(),
      ctrl = require('../controllers/bookingController'),
      { protect } = require('../middleware/auth');
r.use(protect);
r.get('/',       ctrl.getAll);
r.get('/:id',    ctrl.getOne);
r.post('/',      ctrl.create);
// bonus: r.get('/validate/:qr', validateController);
module.exports = r;
