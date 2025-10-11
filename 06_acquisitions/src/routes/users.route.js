import express from 'express';
import { 
  fetchAllUsers, 
  fetchUserById, 
  updateUserById, 
  deleteUserById 
} from './../controllers/users.controller.js';
import { authMiddleware, requireRole } from '#middleware/auth.middleware.js';

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

// GET /api/users - Get all users (admin only)
router.get('/', requireRole('admin'), fetchAllUsers);

// GET /api/users/:id - Get user by ID (users can get their own, admins can get any)
router.get('/:id', fetchUserById);

// PUT /api/users/:id - Update user (users can update their own, admins can update any)
router.put('/:id', updateUserById);

// DELETE /api/users/:id - Delete user (users can delete their own, admins can delete any)
router.delete('/:id', deleteUserById);

export default router;
