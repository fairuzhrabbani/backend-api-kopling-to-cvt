import pool from '../config/database.js';

export const findAllUsers = async () => {
  const query = `
    SELECT
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM users
    ORDER BY id ASC
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const findUserById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    FROM users
    WHERE id = $1
  `;

  const values = [id];

  const result = await pool.query(query, values);

  return result.rows[0];
};
