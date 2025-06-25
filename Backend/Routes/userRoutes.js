const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { isAuthenticated, isAdmin } = require('../utils/middleware');
const passport = require("passport");
require('../utils/passport');
const Application = require('../Models/applications');


router.use(passport.initialize());

// Step 1: Trigger Google Auth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google Callback
router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    session: false
  }),
  (req, res) => {
    // Google login successful
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

// Optional: Google Auth Success (only if frontend fetches token after login)
router.get('/auth/google/success', (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Google Auth Failure
router.get('/auth/google/failure', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed' });
});

// Step 1: Trigger GitHub Auth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Step 2: GitHub Callback
router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/github/failure',
    session: false
  }),
  (req, res) => {
    // GitHub login successful
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);
// Optional: GitHub Auth Success (only if frontend fetches token after login)
router.get('/auth/github/success', (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// GitHub Auth Failure
router.get('/auth/github/failure', (req, res) => {
  res.status(401).json({ message: 'GitHub authentication failed' });
}
);


// Signup Route
router.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials email' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/user/me', isAuthenticated, async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({ message: 'Unauthorized' });
});

router.get('/admin/me', isAuthenticated, isAdmin, async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  res.status(401).json({ message: 'Unauthorized' });
});



router.post('/applications/new', async (req, res) => {
  const { jobId, applicantId, resumeUrl, coverLetter } = req.body;
  const newApplication = new Application({ jobId, applicantId, resumeUrl, coverLetter });
  await newApplication.save();
  res.status(201).json({ message: 'Application submitted successfully' });
});



module.exports = router;
