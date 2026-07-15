const express = require('express');
const app = express();
app.use(express.json());
const pool = require('./config/db');
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Server is running', time: result.rows[0].now });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;