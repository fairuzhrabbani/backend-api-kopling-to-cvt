import pool from '../config/database.js';

export async function findUserByEmail(email) {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        password,
        role,
        created_at,
        updated_at
      FROM users
      WHERE email = $1;
    `,
    [email],
  );

  return result.rows[0];
}
