import express from 'express';

import {
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
} from '../controllers/userController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsersController);

router.get('/:id', authMiddleware, roleMiddleware('admin'), getUserByIdController);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUserController);

export default router;
