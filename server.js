// server.js

const express = require('express');
const mongoose = require('mongoose');
const roleRoutes = require('./routes/roleRoutes');
const { MONGODB_URI } = require('./config/config');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes for role management
app.use('/api/roles', roleRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
