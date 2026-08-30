import {
  findCartByUserId,
  createCart,
  findCartItemsByCartId,
  findCartItem,
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartItems,
} from '../repositories/cart.repository.js';

import { findProductById } from '../repositories/product.repository.js';

export const getOrCreateCart = async (userId) => {
  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
};

export const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const items = await findCartItemsByCartId(cart.id);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => total + Number(item.subtotal), 0);

  return {
    id: cart.id,
    userId: cart.user_id,
    items,
    summary: {
      totalItems,
      totalPrice,
    },
    createdAt: cart.created_at,
    updatedAt: cart.updated_at,
  };
};

export const addToCart = async (userId, productId, quantity) => {
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new Error('Product ID must be a positive integer');
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive integer');
  }

  const product = await findProductById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock <= 0) {
    throw new Error('Product is out of stock');
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = await findCartItem(cart.id, productId);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new Error(`Insufficient stock. Available stock: ${product.stock}`);
    }

    return updateCartItemQuantity(existingItem.id, newQuantity);
  }

  if (quantity > product.stock) {
    throw new Error(`Insufficient stock. Available stock: ${product.stock}`);
  }

  return createCartItem(cart.id, productId, quantity);
};

export const updateCartItem = async (userId, cartItemId, quantity) => {
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new Error('Cart item ID must be a positive integer');
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive integer');
  }

  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  const items = await findCartItemsByCartId(cart.id);

  const cartItem = items.find((item) => item.id === cartItemId);

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  const product = await findProductById(cartItem.product_id);

  if (!product) {
    throw new Error('Product not found');
  }

  if (quantity > product.stock) {
    throw new Error(`Insufficient stock. Available stock: ${product.stock}`);
  }

  return updateCartItemQuantity(cartItemId, quantity);
};

export const removeFromCart = async (userId, cartItemId) => {
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new Error('Cart item ID must be a positive integer');
  }

  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  const items = await findCartItemsByCartId(cart.id);

  const cartItem = items.find((item) => item.id === cartItemId);

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  return deleteCartItem(cartItemId);
};

export const clearCart = async (userId) => {
  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new Error('Cart not found');
  }

  await clearCartItems(cart.id);

  return {
    cartId: cart.id,
    message: 'Cart cleared successfully',
  };
};
