import pool from '../config/database.js';

export async function findAllProducts() {
  const result = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.category_id,
      c.name AS category_name,
      p.created_at,
      p.updated_at
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    ORDER BY p.id;
  `);

  return result.rows;
}

export async function findProductById(id) {
  const result = await pool.query(
    `
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.category_id,
        c.name AS category_name,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN categories c
        ON p.category_id = c.id
      WHERE p.id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function createProduct({ name, description, price, stock, categoryId }) {
  const result = await pool.query(
    `
      INSERT INTO products (
        name,
        description,
        price,
        stock,
        category_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        description,
        price,
        stock,
        category_id,
        created_at,
        updated_at;
    `,
    [name, description, price, stock, categoryId],
  );

  return result.rows[0];
}

export async function updateProduct(id, { name, description, price, stock, categoryId }) {
  const result = await pool.query(
    `
      UPDATE products
      SET
        name = $1,
        description = $2,
        price = $3,
        stock = $4,
        category_id = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING
        id,
        name,
        description,
        price,
        stock,
        category_id,
        created_at,
        updated_at;
    `,
    [name, description, price, stock, categoryId, id],
  );

  return result.rows[0];
}

export async function deleteProduct(id) {
  const result = await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
      RETURNING
        id,
        name,
        description,
        price,
        stock,
        category_id;
    `,
    [id],
  );

  return result.rows[0];
}
