require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/itemsss');
const adminRoutes = require('./routes/admin');
const notifRoutes = require('./routes/notifications');
const reportRoutes = require('./routes/reports');
const messageRoutes = require('./routes/messages');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/refind_db';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

async function start() {
  await connectDB(MONGO_URI);

  // ensure uploads folder exists
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // auto create admin if env provided
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    try {
      const existing = await User.findOne({ email: adminEmail.toLowerCase() });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);
        const admin = new User({ name: 'Admin', email: adminEmail.toLowerCase(), passwordHash, role: 'admin' });
        await admin.save();
        console.log('Admin user auto-created ->', adminEmail);
      } else {
        console.log('Admin exists ->', adminEmail);
      }
    } catch (err) {
      console.error('Error creating admin:', err.message);
    }
  }

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  
  // serve uploads static
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // handel frontend routes
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/items', itemRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/notifications', notifRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/messages', messageRoutes);

  // simple health
  app.get('/', (req, res) => res.json({ status: 'success', data: { msg: 'REFind backend running', baseUrl: BASE_URL } }));

  // handle frontend routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  // error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ status: 'error', message: err.message || 'Server error' });
  });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
