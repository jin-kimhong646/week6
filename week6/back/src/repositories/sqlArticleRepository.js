import { pool } from "../utils/database.js";

// Get all articles with journalist information
export async function getArticles() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.*,
        j.name as journalist_name,
        j.email as journalist_email,
        j.bio as journalist_bio,
        j.id as journalist_id,
        a.journalistid as journalistid
      FROM article a
      LEFT JOIN journalist j ON a.journalistid = j.id
    `);
    return rows;
  } catch (error) {
    console.error('Error in getArticles:', error);
    throw error;
  }
}

// Get one article by ID with journalist information
export async function getArticleById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        a.*,
        j.name as journalist_name,
        j.email as journalist_email,
        j.bio as journalist_bio,
        j.id as journalist_id,
        a.journalistid as journalistid
      FROM article a
      LEFT JOIN journalist j ON a.journalistid = j.id
      WHERE a.id = ?
      `,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error in getArticleById:', error);
    throw error;
  }
}

// Get all articles by journalist ID
export async function getArticlesByJournalistId(journalistId) {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        a.*,
        j.name as journalist_name,
        j.email as journalist_email,
        j.bio as journalist_bio,
        j.id as journalist_id,
        a.journalistid as journalistid
      FROM article a
      LEFT JOIN journalist j ON a.journalistid = j.id
      WHERE a.journalistid = ?
      `,
      [journalistId]
    );
    return rows;
  } catch (error) {
    console.error('Error in getArticlesByJournalistId:', error);
    throw error;
  }
}

// Create a new article
export async function createArticle(article) {
  try {
    const { title, content, category, journalistid } = article;
    const [result] = await pool.query(
      "INSERT INTO article (title, content, category, journalistid) VALUES (?, ?, ?, ?)",
      [title, content, category, journalistid]
    );
    return getArticleById(result.insertId);
  } catch (error) {
    console.error('Error in createArticle:', error);
    throw error;
  }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  try {
    const { title, content, category, journalistid } = updatedData;
    const [result] = await pool.query(
      "UPDATE article SET title = ?, content = ?, category = ?, journalistid = ? WHERE id = ?",
      [title, content, category, journalistid, id]
    );
    return result.affectedRows > 0 ? getArticleById(id) : null;
  } catch (error) {
    console.error('Error in updateArticle:', error);
    throw error;
  }
}

// Delete an article by ID
export async function deleteArticle(id) {
  try {
    const [result] = await pool.query('DELETE FROM article WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error in deleteArticle:', error);
    throw error;
  }
}
