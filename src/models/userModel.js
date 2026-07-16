const pool = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  const {
    customerId,
    fullName,
    email,
    phone,
    password,
    dob,
    gender,
  } = user;
  if(!customerId || !fullName || !email || !phone || !password || !dob || !gender) {
    throw new Error("All fields are required");
  }

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR phone = $2",
    [email, phone]
  );
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users
    (customer_id, full_name, email, phone, password, dob, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, customer_id, full_name, email, phone, dob, gender, created_at
  `;

  const values = [
    customerId,
    fullName,
    email,
    phone,
    hashedPassword,
    dob,
    gender,
  ];
  const result = await pool.query(query, values);

  return result.rows[0];
};
module.exports = {
  createUser,
};