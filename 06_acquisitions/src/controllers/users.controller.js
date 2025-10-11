import logger from '#config/logger.js';
import { users } from '#models/user.model.js';
import { getAllUsers } from '#services/users.service.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users...');
    const allUsers = await getAllUsers();

    res.status(200).json({
      message: 'Successfully retrived users',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
