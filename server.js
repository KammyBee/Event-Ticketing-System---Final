// server.js
require('dotenv').config();
const path    = require('path');
const express = require('express');
const cors    = require('cors');

const connectDB    = require('./config/db');
const authRoutes   = require('./routes/auth');
const eventRoutes  = require('./routes/events');
const bookingRoutes= require('./routes/bookings');
const errorHandler = require('./middleware/errorHandler');

const app = express();

async function start() {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // 2. Global middleware
    app.use(cors());
    app.use(express.json());

    // 3. Serve a static welcome page from /public/index.html
    app.use(express.static(path.join(__dirname, 'public')));

    // 4. API routes
    app.use('/api/auth',     authRoutes);
    app.use('/api/events',   eventRoutes);
    app.use('/api/bookings', bookingRoutes);

    // 5. Catch-all for non-existent routes
    app.use((req, res) => {
      if (req.accepts('html')) {
        // return a custom 404.html in your public folder
        return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
      }
      res.status(404).json({ error: '404 Not Found' });
    });

    // 6. Error handler
    app.use(errorHandler);

    // 7. Start listening
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
