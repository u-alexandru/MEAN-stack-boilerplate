const { User, Roles, permissions } = require('../models');
const { sequelize } = require('../models');
const { bcrypt_compare } = require('../tools/bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.logout = async (req, res) => {
  try {
    const token = req.cookies['access_token'];
    if (!token) {
      throw defaultError('Logout Failed', 401, 'Logout failed')
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // get token exp date
    // Get the user with roles and permissions
    const user = await User.findByPk(decodedToken.id, {
      include: [
        {
          model: Roles,
          as: 'roles',
          include: [
            {
              model: permissions,
              as: 'permissions',
            }
          ]
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Logged out.',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      validationErrors: error.errors,
    });
  }
}