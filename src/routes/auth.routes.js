const express = require('express');
const router = express.Router();
const { createUser } = require('../models/userModel');

router.post('/register', async (req, res) => {
  const user = req.body;
  try {
    const newUser = await createUser(user);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;