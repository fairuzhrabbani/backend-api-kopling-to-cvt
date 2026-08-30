import express from 'express';

import {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from '../controllers/cartController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCartController);

router.post('/items', addToCartController);

router.put('/items/:id', updateCartItemController);

router.delete('/items/:id', removeFromCartController);

router.delete('/', clearCartController);

export default router;
