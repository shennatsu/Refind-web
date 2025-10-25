const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// GET semua notifikasi user login
router.get('/', auth, async (req, res) => {
  try {
    const notifs = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      status: 'success',
      data: notifs.map(n => ({
        id: n._id,
        text: n.text,
        time: new Date(n.createdAt).toLocaleString('id-ID'),
        read: n.read
      }))
    });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Tandai notifikasi sudah dibaca
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notif = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ status: 'error', message: 'Notifikasi tidak ditemukan' });
    res.json({ status: 'success', data: notif });
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
