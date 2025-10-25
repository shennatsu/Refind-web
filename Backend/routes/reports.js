const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// Kirim laporan (user)
router.post('/', auth, async (req, res) => {
  try {
    const { postId, reason, details } = req.body;
    if (!postId || !reason) {
      return res.status(400).json({ status: 'error', message: 'postId dan reason wajib diisi' });
    }

    const report = new Report({
      postId,
      reporter: req.user._id,
      reason,
      details
    });
    await report.save();

    res.status(201).json({ status: 'success', data: report });
  } catch (err) {
    console.error('Error creating report:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Ambil semua laporan (admin)
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('postId', 'title')
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', data: reports });
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ✅ Tandai laporan sudah ditinjau
router.put('/:id/review', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ status: 'error', message: 'Akses ditolak.' });
    }

    const report = await Report.findByIdAndUpdate(req.params.id, { status: 'reviewed' }, { new: true });
    res.json({ status: 'success', data: report });
  } catch (err) {
    console.error('Error updating report:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
