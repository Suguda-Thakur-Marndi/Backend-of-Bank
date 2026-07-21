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
    postalCode,
    email,
    city,
    state,
    phoneNumber,
    password,
    gender,
  } = user;

  if (
    !customerId ||
    !fullName ||
    !mobileNumber ||
    !adharNumber ||
    !dateOfBirth ||
    !nationality ||
    !postalCode ||
    !email ||
    !city ||
    !state ||
    !phoneNumber ||
    !password ||
    !gender
  ) {
    throw new Error("All fields are required");
  }

  const existingUser = await pool.query(
    `SELECT * FROM users
     WHERE email = $1
        OR phone = $2
        OR adhar_number = $3`,
    [email, phoneNumber, adharNumber]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users
    (
      customer_id,
      full_name,
      mobile_number,
      date_of_birth,
      postal_code,
      adhar_number,
      nationality,
      email,
      city,
      state,
      phone,
      password,
      gender
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
    )
    RETURNING
      id,
      customer_id,
      full_name,
      mobile_number,
      date_of_birth,
      postal_code,
      adhar_number,
      nationality,
      email,
      city,
      state,
      phone,
      gender,
      created_at;
  `;

  const values = [
    customerId,
    fullName,
    mobileNumber,
    dateOfBirth,
    postalCode,
    adharNumber,
    nationality,
    email,
    city,
    state,
    phoneNumber,
    hashedPassword,
    gender,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  createUser,
};