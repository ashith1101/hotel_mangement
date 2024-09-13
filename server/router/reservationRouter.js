const express = require('express');
const {makeReservation, cancelReservation, getReservationByUser} = require('../controller/reservationController');
const router = express.Router();
router.post('/', makeReservation);
router.delete('/:id', cancelReservation); 
router.get('/user/:userId', getReservationByUser); 

module.exports = router;