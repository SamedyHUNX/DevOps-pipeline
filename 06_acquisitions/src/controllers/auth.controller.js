import logger from '#config/logger.js';
import { signupSchema } from '#validations/auth.validation.js';
import { formatValidationError } from '#utils/format.js';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, email, role } = validationResult.data;

    // AUTH SERVICE
    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      message: 'User registered',
      user: {
        id: 1,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    logger.error('Signup error', error);

    if (error.message === 'User with this email already exists') {
      return res.status(489).json({ error: 'Email already exist' });
    }

    next(error);
  }
};
