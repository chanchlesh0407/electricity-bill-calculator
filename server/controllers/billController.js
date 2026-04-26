import { pool } from "../config/db.js";
import { generateBill } from "../services/tariffService.js";

// ================= CREATE BILL =================
export const createBill = async (req, res) => {
  try {
    const { category, units, demand } = req.body;

    // 🔥 VALIDATION
    if (!category || !units) {
      return res.status(400).json({
        error: "Category and units are required",
      });
    }

    const u = Number(units);
    const d = Number(demand);

    if (!u || u <= 0) {
      return res.status(400).json({
        error: "Invalid units",
      });
    }

    // 🔥 GENERATE BILL
    const result = generateBill({
      category,
      units: u,
      demand: d,
    });

    console.log("CALCULATED BILL:", result); // 🔥 DEBUG

    // 🔥 INSERT INTO bills
    const billResult = await pool.query(
      `INSERT INTO bills 
      (user_id, category, units, demand, energy_charge, fca, fppas, total)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        req.user.id,
        category,
        u,
        category === "industrial" ? d : null,
        result.energy,   // 🔥 correct mapping
        result.fca,
        result.fppas,
        result.total,
      ]
    );

    const bill = billResult.rows[0];

    // 🔥 INSERT BREAKDOWN (optional but good)
    await pool.query(
      `INSERT INTO bill_items (bill_id, type, amount)
       VALUES 
       ($1, 'energy', $2),
       ($1, 'fca', $3),
       ($1, 'fppas', $4)`,
      [bill.id, result.energy, result.fca, result.fppas]
    );

    // 🔥 DEMAND (ONLY INDUSTRIAL)
    if (category === "industrial" && d) {
      await pool.query(
        `INSERT INTO bill_items (bill_id, type, amount)
         VALUES ($1, 'demand', $2)`,
        [bill.id, d]
      );
    }

    // 🔥 IMPORTANT FIX: RETURN FLAT OBJECT
    res.json({
      id: bill.id,
      category: bill.category,
      units: bill.units,
      demand: bill.demand,
      energy_charge: Number(bill.energy_charge),
      fca: Number(bill.fca),
      fppas: Number(bill.fppas),
      total: Number(bill.total),
      created_at: bill.created_at,
    });

  } catch (err) {
    console.error("CREATE BILL ERROR:", err);
    res.status(500).json({
      error: "Failed to create bill",
    });
  }
};

// ================= GET BILLS =================
export const getBills = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM bills 
       WHERE user_id=$1 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    // 🔥 FIX: Convert numeric strings → numbers
    const bills = result.rows.map((b) => ({
      ...b,
      energy_charge: Number(b.energy_charge),
      fca: Number(b.fca),
      fppas: Number(b.fppas),
      total: Number(b.total),
    }));

    res.json(bills);

  } catch (err) {
    console.error("GET BILLS ERROR:", err);
    res.status(500).json({
      error: "Failed to fetch bills",
    });
  }
};

// ================= DELETE BILL =================
export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM bills WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Bill not found or unauthorized",
      });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};