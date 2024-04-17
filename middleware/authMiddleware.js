const jwt = require('jsonwebtoken');
const axios = require('axios');
const { JWT_SECRET } = require('../config/config');

// Middleware to verify authentication token and role-based authorization
const verifyAuthTokenAndRole = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Check if decoded token contains user ID
    if (!decodedToken.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Fetch user profile from user microservice based on user ID
    const userId = decodedToken.userId;
    const userProfileResponse = await axios.get(`http://localhost:3001/api/profile/${userId}`);
    const userProfile = userProfileResponse.data;

    // Check if user profile exists
    if (!userProfile) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Check user's role
    if (userProfile.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    // Attach user profile object to request object
    req.userProfile = userProfile;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying authentication token and role:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { verifyAuthTokenAndRole };
