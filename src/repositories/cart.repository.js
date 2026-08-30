import pool from '../config/database.js';

export const findCartByUserId = async (userId) => {
  const query = `
    SELECT
      c.id,
      c.user_id,
      c.created_at,
      c.updated_at
    FROM carts c
    WHERE c.user_id = $1
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0];
};

export const createCart = async (userId) => {
  const query = `
    INSERT INTO carts (user_id)
    VALUES ($1)
    RETURNING
      id,
      user_id,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [userId]);

  return result.rows[0];
};

export const findCartItemsByCartId = async (cartId) => {
  const query = `
    SELECT
      ci.id,
      ci.cart_id,
      ci.product_id,
      p.name AS product_name,
      p.price,
      ci.quantity,
      (p.price * ci.quantity) AS subtotal,
      ci.created_at,
      ci.updated_at
    FROM cart_items ci
    INNER JOIN products p
      ON p.id = ci.product_id
    WHERE ci.cart_id = $1
    ORDER BY ci.id ASC
  `;

  const result = await pool.query(query, [cartId]);

  return result.rows;
};

export const findCartItem = async (cartId, productId) => {
  const query = `
    SELECT
      id,
      cart_id,
      product_id,
      quantity,
      created_at,
      updated_at
    FROM cart_items
    WHERE cart_id = $1
      AND product_id = $2
  `;

  const result = await pool.query(query, [cartId, productId]);

  return result.rows[0];
};

export const createCartItem = async (cartId, productId, quantity) => {
  const query = `
    INSERT INTO cart_items (
      cart_id,
      product_id,
      quantity
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      cart_id,
      product_id,
      quantity,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [cartId, productId, quantity]);

  return result.rows[0];
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const query = `
    UPDATE cart_items
    SET
      quantity = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      cart_id,
      product_id,
      quantity,
      created_at,
      updated_at
  `;

  const result = await pool.query(query, [quantity, cartItemId]);

  return result.rows[0];
};

export const deleteCartItem = async (cartItemId) => {
  const query = `
    DELETE FROM cart_items
    WHERE id = $1
    RETURNING
      id,
      cart_id,
      product_id,
      quantity
  `;

  const result = await pool.query(query, [cartItemId]);

  return result.rows[0];
};

export const clearCartItems = async (cartId) => {
  const query = `
    DELETE FROM cart_items
    WHERE cart_id = $1
    RETURNING id
  `;

  const result = await pool.query(query, [cartId]);

  return result.rows;
};
