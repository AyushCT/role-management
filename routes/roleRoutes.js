// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');

// Define POST route with a callback function
router.post('/roles', authMiddleware.verifyAuthTokenAndRole, roleController.createRole);

module.exports = router;
