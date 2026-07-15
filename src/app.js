const express = require('express');
const app = express();
const client = require('./config/db');
app.use(express.json());


module.exports = app;