const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Kirim pesan
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, text, itemId } = req.body;
    if (!receiverId || !text) {
      return res.status(400).json({ status: 'error', message: 'receiverId dan text wajib diisi' });
    }

    const msg = new Message({
      sender: req.user._id,
      receiver: receiverId,
      text,
      item: itemId || null
    });
    await msg.save();

    res.status(201).json({ status: 'success', data: msg });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Ambil percakapan antara dua user
router.get('/:userId', auth, async (req, res) => {
  try {
    const userId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.json({ status: 'success', data: messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
