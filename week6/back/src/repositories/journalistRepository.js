import { pool } from "../utils/database.js";

// Get all journalists
export async function getJournalists() {
  const [rows] = await pool.query("SELECT * FROM journalist");
  return rows;
}

// Get journalist by ID
export async function getJournalistById(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM journalist WHERE id = ?", [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error in getJournalistById:", error);
    throw error;
  }
}

// Create a new journalist
export async function createJournalist(journalist) {
  try {
    const { name, email, bio } = journalist;
    const [result] = await pool.query(
      "INSERT INTO journalist (name, email, bio) VALUES (?, ?, ?)",
      [name, email, bio]
    );
    return getJournalistById(result.insertId);
  } catch (error) {
    console.error("Error in createJournalist:", error);
    throw error;
  }
}

// Update a journalist
export async function updateJournalist(id, updatedData) {
  try {
    const { name, email, bio } = updatedData;
    const [result] = await pool.query(
      "UPDATE journalist SET name = ?, email = ?, bio = ? WHERE id = ?",
      [name, email, bio, id]
    );
    return result.affectedRows > 0 ? getJournalistById(id) : null;
  } catch (error) {
    console.error("Error in updateJournalist:", error);
    throw error;
  }
}

// Delete a journalist
export async function deleteJournalist(id) {
  try {
    const [result] = await pool.query("DELETE FROM journalist WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error in deleteJournalist:", error);
    throw error;
  }
}
