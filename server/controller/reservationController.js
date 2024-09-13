const Reservation = require('../model/reservation')

// Make a Reservation
const makeReservation = async (req, res) => {
  const { userId, seatingPreferences, reservationTime } = req.body;

  try {
    const newReservation = new Reservation({
      userId,
      seatingPreferences,
      reservationTime,
    });

    await newReservation.save();

    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation cancelled', reservation: deletedReservation });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Reservation by User
const getReservationByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await Reservation.find({ userId });

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { makeReservation, cancelReservation, getReservationByUser };
