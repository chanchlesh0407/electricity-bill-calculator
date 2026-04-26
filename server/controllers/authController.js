import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (req, res) => {
  const {
    first_name,
    lastname,
    email,
    password,
    mobile,
    ivrs,
    aadhar,
    address,
  } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await pool.query(
    `INSERT INTO users 
    (first_name, lastname, email, password_hash, mobile, ivrs, aadhar, address)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [first_name, lastname, email, hash, mobile, ivrs, aadhar, address]
  );

  res.json(user.rows[0]);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows.length)
    return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(
    password,
    user.rows[0].password_hash
  );

  if (!valid)
    return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token, user: user.rows[0] });
};