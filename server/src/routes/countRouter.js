const express = require('express');
const router = express.Router();

const { createCount, getAllCount, getCountById, updateCount, deleteCount } = require('../controllers/CountController');

router.post('/create', createCount);
router.get('/all', getAllCount);
router.get('/:id', getCountById);
router.put('/:id', updateCount);
router.delete('/:id', deleteCount);

module.exports = router;
