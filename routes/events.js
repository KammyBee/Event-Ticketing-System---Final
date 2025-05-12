// routes/events.js
const r = require('express').Router(),
      ctrl = require('../controllers/eventController'),
      { protect, adminOnly } = require('../middleware/auth');
r.get('/',       ctrl.getAll);
r.get('/:id',    ctrl.getOne);
r.post('/',      protect, adminOnly, ctrl.create);
r.put('/:id',    protect, adminOnly, ctrl.update);
r.delete('/:id', protect, adminOnly, ctrl.remove);
module.exports = r;
