import { pool } from "../config/db.js";

export const getProfile = async (req, res) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [req.user.id]
  );

  res.json(user.rows[0]);
};

export const updateProfile = async (req, res) => {
  const { first_name, lastname, mobile, address } = req.body;

  await pool.query(
    `UPDATE users 
     SET first_name=$1, lastname=$2, mobile=$3, address=$4
     WHERE id=$5`,
    [first_name, lastname, mobile, address, req.user.id]
  );

  res.json({ message: "Updated" });
};