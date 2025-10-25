const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// ✅ Middleware: hanya admin yang boleh akses
function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ status: 'error', message: 'Akses ditolak (bukan admin)' });
  }
  next();
}

// ✅ Statistik umum untuk dashboard admin
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const totalReports = await Report.countDocuments({ status: 'pending' }); // hanya yang perlu ditinjau

    res.json({
      status: 'success',
      data: {
        totalItems,
        totalReports
      }
    });
  } catch (err) {
    console.error('Error in /admin/stats:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ✅ Daftar laporan pengguna
router.get('/reports', auth, isAdmin, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('postId', 'title')       // pastikan nama field di model Report itu "item"
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: reports.map(r => ({
        id: r._id,
        postId: r.item?._id || r.itemId?._id,
        postTitle: r.item?.title || 'Tidak diketahui',
        reason: r.reason,
        reporter: r.reporter?.name || 'Anonim',
        status: r.status || 'pending',
        createdAt: r.createdAt
      }))
    });
  } catch (err) {
    console.error('Error in /admin/reports:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
