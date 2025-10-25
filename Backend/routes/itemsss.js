const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// === Multer configuration ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
  }
});
const upload = multer({ storage });

// === Helper Functions ===
function formatDateIndo(d) {
  if (!d) return null;
  const date = new Date(d);
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
function statusLabel(type) {
  if (type === 'found') return 'Ditemukan';
  if (type === 'lost') return 'Hilang';
  return 'Unknown';
}
function formatItemForFrontend(item) {
  return {
    id: item._id.toString(),
    category: item.category || '',
    title: item.title,
    location: item.location || '',
    date: formatDateIndo(item.createdAt),
    status: statusLabel(item.type),
    imageUrl: item.photoUrl || null
  };
}

// === CREATE ITEM + AUTO MATCHING ===
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { title, description = '', location = '', type, category = '' } = req.body;
    if (!title || !type) {
      return res.status(400).json({ status: 'error', message: 'title and type required' });
    }

    const photoUrl = req.file ? `${process.env.BASE_URL || ''}/uploads/${req.file.filename}` : null;
    const item = new Item({
      title,
      description,
      location,
      type,
      photoUrl,
      category,
      owner: req.user?._id || null
    });
    await item.save();

    // === Matching otomatis ===
    const oppositeType = type === 'lost' ? 'found' : 'lost';
    const possibleMatches = await Item.find({
      type: oppositeType,
      isResolved: false,
      $or: [
        { title: new RegExp(title, 'i') },
        { description: new RegExp(title, 'i') },
        { category: new RegExp(category, 'i') }
      ]
    }).populate('owner', 'name email');

    // === Tambahkan notifikasi ke user yang match ===
    const Notification = require('../models/Notification');
    for (const match of possibleMatches) {
      if (match.owner?._id && (!req.user || match.owner._id.toString() !== req.user._id.toString())) {
        const notifText = type === 'found'
          ? `Barang "${match.title}" yang Anda laporkan hilang mungkin telah ditemukan!`
          : `Ada laporan baru barang hilang mirip "${match.title}". Coba periksa!`;
        await Notification.create({
          user: match.owner._id,
          text: notifText,
        });
      }
    }

    return res.status(201).json({
      status: 'success',
      data: formatItemForFrontend(item),
      matches: possibleMatches.map(m => formatItemForFrontend(m))
    });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// === GET ALL ITEMS ===
router.get('/', async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;
    const q = {};
    if (type) {
      if (type === 'Hilang') q.type = 'lost';
      else if (type === 'Ditemukan') q.type = 'found';
      else q.type = type;
    }
    if (search) q.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { location: new RegExp(search, 'i') },
      { category: new RegExp(search, 'i') }
    ];

    const p = Math.max(1, parseInt(page));
    const l = Math.max(1, Math.min(100, parseInt(limit)));
    const skip = (p - 1) * l;

    const total = await Item.countDocuments(q);
    const items = await Item.find(q).populate('owner', 'name email avatarUrl').sort({ createdAt: -1 }).skip(skip).limit(l);
    const data = items.map(formatItemForFrontend);

    res.json({
      status: 'success',
      data: {
        items: data,
        pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// === GET DETAIL ITEM ===
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email avatarUrl');
    if (!item) return res.status(404).json({ status: 'error', message: 'Item not found' });
    res.json({ status: 'success', data: formatItemForFrontend(item) });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// === UPDATE ITEM ===
router.put('/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ status: 'error', message: 'Not found' });
    if (item.owner && item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Forbidden' });
    }

    const { title, description, location, type, isResolved, category } = req.body;
    if (title) item.title = title;
    if (description !== undefined) item.description = description;
    if (location !== undefined) item.location = location;
    if (type) item.type = type;
    if (category !== undefined) item.category = category;
    if (isResolved !== undefined) item.isResolved = isResolved === 'true' || isResolved === true;
    if (req.file) item.photoUrl = `${process.env.BASE_URL || ''}/uploads/${req.file.filename}`;
    
    await item.save();
    const populated = await item.populate('owner', 'name email avatarUrl');
    res.json({ status: 'success', data: formatItemForFrontend(populated) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// === DELETE ITEM ===
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ status: 'error', message: 'Not found' });
    if (item.owner && item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'error', message: 'Forbidden' });
    }
    await item.remove();
    res.json({ status: 'success', message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
