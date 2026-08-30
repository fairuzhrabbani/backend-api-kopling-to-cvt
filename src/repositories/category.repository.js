import pool from '../config/database.js';

export async function findAllCategories() {
  const result = await pool.query(`
    SELECT id, name, description
    FROM categories
    ORDER BY id;
  `);

  return result.rows;
}

export async function findCategoryById(id) {
  const result = await pool.query(
    `
      SELECT id, name, description
      FROM categories
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function createCategory({ name, description }) {
  const result = await pool.query(
    `
      INSERT INTO categories (name, description)
      VALUES ($1, $2)
      RETURNING id, name, description;
    `,
    [name, description],
  );

  return result.rows[0];
}

export async function updateCategory(id, { name, description }) {
  const result = await pool.query(
    `
      UPDATE categories
      SET name = $1,
          description = $2
      WHERE id = $3
      RETURNING id, name, description;
    `,
    [name, description, id],
  );

  return result.rows[0];
}

export async function deleteCategory(id) {
  const result = await pool.query(
    `
      DELETE FROM categories
      WHERE id = $1
      RETURNING id, name, description;
    `,
    [id],
  );

  return result.rows[0];
}
