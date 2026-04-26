import { pool } from "../config/db.js";

export const getAnalytics = async (req, res) => {
  try {
    const { year } = req.query;

    // 🔥 Default to current year
    const selectedYear = year || new Date().getFullYear();

    const result = await pool.query(
      `
      SELECT 
        EXTRACT(MONTH FROM created_at) AS month_num,
        TO_CHAR(created_at, 'Mon') AS month,
        SUM(total) AS total_amount
      FROM bills
      WHERE user_id = $1
        AND EXTRACT(YEAR FROM created_at) = $2
      GROUP BY month_num, month
      ORDER BY month_num
      `,
      [req.user.id, selectedYear]
    );

    // 🔥 Ensure all months exist (fill missing with 0)
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const dataMap = {};
    result.rows.forEach((row) => {
      dataMap[row.month] = Number(row.total_amount);
    });

    const finalData = months.map((m, index) => ({
      month: m,
      total_amount: dataMap[m] || 0,
    }));

    res.json(finalData);

  } catch (err) {
    console.error("ANALYTICS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};