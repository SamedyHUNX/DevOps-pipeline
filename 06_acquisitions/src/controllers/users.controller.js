import logger from '#config/logger.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '#services/users.service.js';
import { userIdSchema, updateUserSchema } from '#validations/users.validation.js';
import { formatValidationError } from '#utils/format.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users...');
    const allUsers = await getAllUsers();

    res.status(200).json({
      message: 'Successfully retrieved users',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { id } = validationResult.data;
    const currentUser = req.user;

    // Authorization checks
    const isOwner = currentUser.id === id;
    const isAdmin = currentUser.role === 'admin';

    // Users can only view their own information, admins can view any user
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only view your own information',
      });
    }

    logger.info(`Getting user by ID: ${id}`);
    
    const user = await getUserById(id);

    res.status(200).json({
      message: 'Successfully retrieved user',
      user,
    });
  } catch (error) {
    logger.error(`Error fetching user by ID:`, error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    // Validate user ID from params
    const idValidationResult = userIdSchema.safeParse(req.params);
    if (!idValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(idValidationResult.error),
      });
    }

    // Validate update data from body
    const bodyValidationResult = updateUserSchema.safeParse(req.body);
    if (!bodyValidationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(bodyValidationResult.error),
      });
    }

    const { id } = idValidationResult.data;
    const updates = bodyValidationResult.data;
    const currentUser = req.user;

    // Authorization checks
    const isOwner = currentUser.id === id;
    const isAdmin = currentUser.role === 'admin';

    // Users can only update their own information
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only update your own information',
      });
    }

    // Only admins can change user roles
    if (updates.role && !isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Only administrators can change user roles',
      });
    }

    // If non-admin user is trying to update someone else's role, prevent it
    if (updates.role && !isOwner && !isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions to change user role',
      });
    }

    logger.info(`Updating user ${id}`);
    const updatedUser = await updateUser(id, updates);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    logger.error('Error updating user:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { id } = validationResult.data;
    const currentUser = req.user;

    // Authorization checks
    const isOwner = currentUser.id === id;
    const isAdmin = currentUser.role === 'admin';

    // Users can only delete their own account, admins can delete any account
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own account',
      });
    }

    logger.info(`Deleting user ${id}`);
    const deletedUser = await deleteUser(id);

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    logger.error('Error deleting user:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    next(error);
  }
};
