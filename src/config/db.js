const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "bankdb",
  password: process.env.DB_PASSWORD || "your_password",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error:", err));

module.exports = client;