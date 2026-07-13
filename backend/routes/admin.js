const express = require('express');
const router = express.Router();
const { isLoggedInAsAdmin } = require('../middleware/auth');
const recycleItem = require('../models/recycleItem');
const garbage = require('../models/garbage');

// GET /api/admin/recycling-requests
router.get('/recycling-requests', isLoggedInAsAdmin, async (req, res) => {
  try {
    const recycleRequests = await recycleItem.find().populate('user', 'username email');
    res.json({ success: true, requests: recycleRequests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching recycling requests' });
  }
});

// GET /api/admin/garbage-requests
router.get('/garbage-requests', isLoggedInAsAdmin, async (req, res) => {
  try {
    const garbageRequests = await garbage.find().populate('user', 'username email');
    res.json({ success: true, requests: garbageRequests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching garbage requests' });
  }
});

// POST /api/admin/update-recycling-status
router.post('/update-recycling-status', isLoggedInAsAdmin, async (req, res) => {
  const { requestId } = req.body;
  try {
    const updated = await recycleItem.findByIdAndUpdate(
      requestId,
      { status: 'completed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});

// POST /api/admin/update-garbage-status
router.post('/update-garbage-status', isLoggedInAsAdmin, async (req, res) => {
  const { requestId } = req.body;
  try {
    const updated = await garbage.findByIdAndUpdate(
      requestId,
      { status: 'completed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Request not found' });
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});

module.exports = router;
