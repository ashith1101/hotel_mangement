const Waitlist = require('../model/waitlist');

// Add to Waitlist
const addToWaitlist = async (req, res) => {
  const { userId, waitTime } = req.body;

  try {
    const newWaitlistEntry = new Waitlist({
      userId,
      waitTime,
    });

    await newWaitlistEntry.save();

    res.status(201).json(newWaitlistEntry);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from Waitlist
const removeFromWaitlist = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWaitlistEntry = await Waitlist.findByIdAndDelete(id);

    if (!deletedWaitlistEntry) {
      return res.status(404).json({ message: 'Waitlist entry not found' });
    }

    res.json({ message: 'Removed from waitlist', entry: deletedWaitlistEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Waitlist
const getWaitlist = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate('userId');

    res.json(waitlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToWaitlist, removeFromWaitlist, getWaitlist };
