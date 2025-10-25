const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  res.json({ status: 'success', data: req.user.toPublic() });
});

router.put('/me', auth, async (req, res) => {
  try {
    const up = {};
    if (req.body.name) up.name = req.body.name;
    if (req.body.avatarUrl) up.avatarUrl = req.body.avatarUrl;
    const user = await User.findByIdAndUpdate(req.user._id, up, { new: true });
    res.json({ status: 'success', data: user.toPublic() });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
