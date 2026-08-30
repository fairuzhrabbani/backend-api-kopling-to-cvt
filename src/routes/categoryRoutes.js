import express from 'express';

import {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controller/categoryController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

// USER + ADMIN
router.get('/', authMiddleware, getAllCategoriesController);

router.get('/:id', authMiddleware, getCategoryByIdController);

// ADMIN ONLY
router.post('/', authMiddleware, roleMiddleware('admin'), createCategoryController);

router.put('/:id', authMiddleware, roleMiddleware('admin'), updateCategoryController);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteCategoryController);

export default router;
