const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Render login form
router.get('/login', (req, res) => {
  res.render('auth/login', { error: '' });
});

// Render registration form
router.get('/register', (req, res) => {
  res.render('auth/register', { error: '' });
});

// Handle registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, number, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('auth/register', { error: '❌ Passwords do not match.' });
  }

  const userExists = await User.findOne({ $or: [{ email }, { number }] });
  if (userExists) {
    return res.render('auth/register', { error: '❌ User already exists.' });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, number, email, password: hash });
  await user.save();

  req.flash('success', '✅ Registered successfully!');
  res.redirect('/auth/login');
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, number, password } = req.body;

  const user = await User.findOne({ $or: [{ email }, { number }] });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('auth/login', { error: '❌ Invalid credentials' });
  }

  req.session.user = user;
  res.redirect('/notes');
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
});

module.exports = router;
