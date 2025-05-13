const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/eventController');

// **no** “/api/events” prefix here—this file only knows about “/”
router.get('/',      getAll);
router.get('/:id',   getOne);
router.post('/',     create);
router.put('/:id',   update);
router.delete('/:id', remove);

module.exports = router;
