import express from 'express';

import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controller/productController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

// USER + ADMIN
router.get('/', authMiddleware, getAllProductsController);

router.get('/:id', authMiddleware, getProductByIdController);

// ADMIN ONLY
router.post('/', authMiddleware, roleMiddleware('admin'), createProductController);

router.put('/:id', authMiddleware, roleMiddleware('admin'), updateProductController);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProductController);

export default router;
