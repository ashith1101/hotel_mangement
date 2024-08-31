const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // console.log('User authenticated:', req.user);
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard'); 
  }
);

module.exports = router;
