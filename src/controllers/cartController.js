import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../services/cart.service.js';

const getUserId = (req) => {
  return Number(req.user.userId);
};

export const getCartController = async (req, res) => {
  try {
    const userId = getUserId(req);

    const cart = await getCart(userId);

    return res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Failed to fetch cart:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
    });
  }
};

export const addToCartController = async (req, res) => {
  try {
    const userId = getUserId(req);

    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);

    const cartItem = await addToCart(userId, productId, quantity);

    return res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: cartItem,
    });
  } catch (error) {
    console.error('Failed to add product to cart:', error);

    const statusCode =
      error.message === 'Product not found' ? 404 : error.message.includes('stock') ? 400 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItemController = async (req, res) => {
  try {
    const userId = getUserId(req);

    const cartItemId = Number(req.params.id);
    const quantity = Number(req.body.quantity);

    const cartItem = await updateCartItem(userId, cartItemId, quantity);

    return res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: cartItem,
    });
  } catch (error) {
    console.error('Failed to update cart item:', error);

    const statusCode =
      error.message === 'Cart not found' ||
      error.message === 'Cart item not found' ||
      error.message === 'Product not found'
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromCartController = async (req, res) => {
  try {
    const userId = getUserId(req);

    const cartItemId = Number(req.params.id);

    const deletedItem = await removeFromCart(userId, cartItemId);

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully',
      data: deletedItem,
    });
  } catch (error) {
    console.error('Failed to remove cart item:', error);

    const statusCode =
      error.message === 'Cart not found' || error.message === 'Cart item not found' ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCartController = async (req, res) => {
  try {
    const userId = getUserId(req);

    const result = await clearCart(userId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        cartId: result.cartId,
      },
    });
  } catch (error) {
    console.error('Failed to clear cart:', error);

    const statusCode = error.message === 'Cart not found' ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
