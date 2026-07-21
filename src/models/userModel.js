const pool = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  const {
    customerId,
    fullName,
    mobileNumber, 
    adharNumber,
    dateOfBirth,
    nationality,
    pastalcode,
    email,
    city,
    state,
    phonenumber,
    password,
    dob,
    gender,
  } = user;
  if(!customerId || !fullName || !mobileNumber || !dateOfBirth || !pastalcode || !adharNumber || !nationality || !email || !city || !state || !phonenumber || !password || !dob || !gender) {
    throw new Error("All fields are required");
  }

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR phone = $2 OR adhar_number = $3",
    [email, phonenumber, adharNumber]
  );
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users
    (customer_id, full_name, mobile_number, date_of_birth, postal_code, adhar_number, nationality, email, city, state, phone, password, dob, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id, customer_id, full_name, mobile_number, date_of_birth, postal_code, adhar_number, nationality, email, city, state, phone, dob, gender, created_at
  `;

  const values = [
    customerId,
    fullName,
    mobileNumber,
    dateOfBirth,
    pastalcode,
    adharNumber,
    nationality,
    email,
    city,
    state,
    phonenumber,
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