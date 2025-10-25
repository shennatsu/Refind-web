function adminOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  if (req.user.role !== 'admin') return res.status(403).json({ status: 'error', message: 'Forbidden: admin only' });
  next();
}

module.exports = adminOnly;
