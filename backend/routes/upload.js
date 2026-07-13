const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { isLoggedInAsUser } = require('../middleware/auth');
const upload = require('../config/multerConfig');
const { getAddressFromCoordinates2, findNearestRecyclingCenter } = require('../config/recyclingConfig');
const { getAddressFromCoordinates1, findNearestGarbageCenter } = require('../config/garbageConfig');
const userModel = require('../models/user');
const garbage = require('../models/garbage');
const recycleItem = require('../models/recycleItem');

const { EMAIL_USER: emailUser, EMAIL_PASS: emailPass } = process.env;

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: emailUser, pass: emailPass },
    tls: { rejectUnauthorized: false }
  });
}

// POST /api/upload/garbage
router.post('/garbage', isLoggedInAsUser, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const lat = parseFloat(req.body.latitude);
  const lon = parseFloat(req.body.longitude);
  const manualAddress = req.body.manualAddress;

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ success: false, message: 'Invalid latitude or longitude' });
  }

  const image = req.file;
  const nearestCenter = findNearestGarbageCenter(lat, lon);
  if (!nearestCenter) return res.status(500).json({ success: false, message: 'No garbage centers found' });

  const address = await getAddressFromCoordinates1(lat, lon);

  try {
    const user = await userModel.findOne({ email: req.user.email });
    const newGarbageRequest = new garbage({
      user: user._id,
      description: `Garbage reported at ${manualAddress}`,
      location: `${lat}, ${lon}`
    });
    await newGarbageRequest.save();
    user.garbageRequests.push(newGarbageRequest._id);
    await user.save();

    // Send email async (non-blocking)
    const transporter = createTransporter();
    transporter.sendMail({
      from: emailUser,
      to: nearestCenter.email,
      subject: 'Garbage Report',
      text: `Garbage reported at ${manualAddress}\nNearest garbage center: ${nearestCenter.name}.\nUsername: ${req.user.username}\nEmail: ${req.user.email}`,
      attachments: [{ filename: image.originalname, path: image.path }]
    }, (err) => {
      if (err) console.error('Email error:', err);
      fs.unlink(image.path, () => {});
    });

    res.json({ success: true, message: 'Garbage reported successfully', address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to process request' });
  }
});

// POST /api/upload/recycle
router.post('/recycle', isLoggedInAsUser, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const lat = parseFloat(req.body.latitude);
  const lon = parseFloat(req.body.longitude);

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ success: false, message: 'Invalid latitude or longitude' });
  }

  const image = req.file;
  const nearestCenter = findNearestRecyclingCenter(lat, lon);
  if (!nearestCenter) return res.status(500).json({ success: false, message: 'No recycling centers found' });

  const address = await getAddressFromCoordinates2(lat, lon);

  try {
    const user = await userModel.findOne({ email: req.user.email });
    const newRecycleRequest = new recycleItem({
      user: user._id,
      description: `Items to be Recycled at ${address}`,
      location: `${lat}, ${lon}`
    });
    await newRecycleRequest.save();
    user.recycleRequests.push(newRecycleRequest._id);
    await user.save();

    // Send email async (non-blocking)
    const transporter = createTransporter();
    transporter.sendMail({
      from: emailUser,
      to: nearestCenter.email,
      subject: 'Recycling Items Report',
      text: `Items to be recycled reported at: ${address}\nLat: ${lat}, Lon: ${lon}\nNearest recycling center: ${nearestCenter.name}.\nEmail: ${req.user.email}\nUsername: ${req.user.username}`,
      attachments: [{ filename: image.originalname, path: image.path }]
    }, (err) => {
      if (err) console.error('Email error:', err);
      fs.unlink(image.path, () => {});
    });

    res.json({ success: true, message: 'Recycle request submitted successfully', address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to process request' });
  }
});

module.exports = router;
