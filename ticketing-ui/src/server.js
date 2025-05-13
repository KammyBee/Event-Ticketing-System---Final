// src/server.js
require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');

const connectDB     = require('./config/db');
const authRoutes    = require('./routes/auth');
const eventRoutes   = require('./routes/events');
const bookingRoutes = require('./routes/bookings');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

async function start() {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // 2. Global middleware
    app.use(cors());
    app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'build')));

    // 4. Mount API routes
    app.use('/api/auth',     authRoutes);
    app.use('/api/events',   eventRoutes);
    app.use('/api/bookings', bookingRoutes);


// catch-all: send React's index.html for any non-API route
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

    // 6. Central error handler
    app.use(errorHandler);

    // 7. Start the server
    const PORT = process.env.PORT || 3100;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
