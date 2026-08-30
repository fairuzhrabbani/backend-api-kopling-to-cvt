import { findAllUsers, findUserById } from '../repositories/user.repository.js';

export const getAllUsersController = async (req, res) => {
  try {
    const users = await findAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'User ID must be a positive integer',
      });
    }

    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
};
