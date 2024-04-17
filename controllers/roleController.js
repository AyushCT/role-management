const axios = require('axios');
const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await fetchUserData(userId);

    if (userData.role !== 'admin') {
      return res.status(403).json({ error: 'User is not authorized to create roles.' });
    }

    const { name, description } = req.body;
    const role = new Role({ name, description });
    await role.save();

    res.status(201).json({ message: 'Role created successfully.', role });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

async function fetchUserData(userId) {
  const response = await axios.get(`http://user-service/users/${userId}`);
  return response.data;
}
