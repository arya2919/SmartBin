const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const adminModel = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const { ADMIN_PASSKEY } = process.env;

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await userModel.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'User already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ username, email, password: hash });

    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ success: true, token, user: { username: user.username, email: user.email, profilePic: user.profilePic } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ success: true, token, user: { username: user.username, email: user.email, profilePic: user.profilePic } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// POST /api/auth/admin/register
router.post('/admin/register', async (req, res) => {
  const { username, email, password, passkey } = req.body;
  if (passkey !== ADMIN_PASSKEY) return res.status(401).json({ success: false, message: 'Invalid passkey' });

  try {
    const existing = await adminModel.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Admin already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const admin = await adminModel.create({ username, email, password: hash });

    const token = jwt.sign({ email: admin.email }, JWT_SECRET);
    res.json({ success: true, token, admin: { username: admin.username, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// POST /api/auth/admin/login
router.post('/admin/login', async (req, res) => {
  const { email, password, passkey } = req.body;
  if (passkey !== ADMIN_PASSKEY) return res.status(401).json({ success: false, message: 'Invalid passkey' });

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ email: admin.email }, JWT_SECRET);
    res.json({ success: true, token, admin: { username: admin.username, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
