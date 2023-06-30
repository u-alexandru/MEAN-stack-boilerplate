const jwt = require('jsonwebtoken');
const { User, Roles, permissions } = require('../models'); // import Sequelize models

function checkPermission(permissionName) {
    return async (req, res, next) => {
        try {
            // Parse the user's JWT token to get their ID
            const token = req.cookies['access_token'];
            if (!token) {
                return res.status(401).json({ message: 'You must be logged in to access this resource' });
            }
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const userId = decodedToken.id;


            // Query the database to get the user's permissions
            const user = await User.findByPk(userId, {
                include: [
                    {
                        model: Roles,
                        as: 'roles',
                        include: [
                            {
                                model: permissions,
                                as: 'permissions',
                                where: { name: permissionName }
                            }
                        ]
                    }
                ]
            });

            // Check if user is active
            if (!user.active) {
                return res.status(401).json({ message: 'Your account has been deactivated' });
            }
            console.log('roles')
            console.log(user.roles)
            // Check if the user has the required permission
            if (user && user.roles.some(role => role.permissions.length > 0)) {
                // User has the required permission, pass control to the next middleware function
                return next();
            } else {
                // User does not have the required permission, return an HTTP 403 Forbidden response
                return res.status(403).json({ message: 'You do not have permission to access this resource', user: user });
            }
        } catch (err) {
            // JWT token is invalid or user is not found in the database
            console.log(err);
            return res.status(401).json({ message: 'Unexpected error' });
        }
    };
}

module.exports = checkPermission;