const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,

  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,

  max: 20,                  
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, 
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully");
    client.release();
  } catch (err) {
  console.error("❌ PostgreSQL Connection Error:");
  console.error(err);
}
};

pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL Error:", err.message);
});

module.exports = {
  pool,
  connectDB,
};