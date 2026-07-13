const express = require('express');
const router = express.Router();
const { isLoggedInAsUser } = require('../middleware/auth');
const userModel = require('../models/user');

// GET /api/user/profile
router.get('/profile', isLoggedInAsUser, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate('garbageRequests')
      .populate('recycleRequests');
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
