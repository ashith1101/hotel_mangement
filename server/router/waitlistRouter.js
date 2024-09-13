const express = require('express');
const { addToWaitlist, removeFromWaitlist, getWaitlist } = require('../controller/waitlistController');

const router = express.Router();

router.post('/', addToWaitlist); 
router.delete('/:id', removeFromWaitlist); 
router.get('/', getWaitlist); 

module.exports = router;
