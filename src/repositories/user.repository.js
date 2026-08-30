import pool from '../config/database.js';

export const findUserByEmail = async (email) => {
  const query = `
    SELECT
      id,
      name,
      email,
      password,
      role,
      created_at,
      updated_at
    FROM users
    WHERE email = $1
  `;

  const values = [email];

  const result = await pool.query(query, values);

  return result.rows[0];
};

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

export const createUser = async ({ name, email, password }) => {
  const query = `
    INSERT INTO users (
      name,
      email,
      password,
      role,
      created_at,
      updated_at
    )
    VALUES (
      $1,
      $2,
      $3,
      'user',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    RETURNING
      id,
      name,
      email,
      role,
      created_at,
      updated_at
  `;

  const values = [name, email, password];

  const result = await pool.query(query, values);

  return result.rows[0];
};