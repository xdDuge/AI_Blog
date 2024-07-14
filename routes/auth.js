// routes/auth.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      password
    });

    await user.save();

    res.redirect('/auth/login');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
