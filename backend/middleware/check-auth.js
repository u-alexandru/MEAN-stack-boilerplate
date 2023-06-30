const jwt = require('jsonwebtoken');
const defaultError = require('../helpers/customErrors');
const redisClient = require('../tools/redis-client');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies['access_token'];
    if (!token) {
      throw defaultError('Auth failed', 401, 'auth_failed')
    }

    redisClient.on('error', function (err) {
      console.log('Something went wrong ', err)
    });
    const inDenyList = await redisClient.get(`bl_${token}`);
    if (inDenyList) {
      console.log(inDenyList);
      return res.status(401).send({
        message: "JWT Rejected",
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // Reset the token expiration time
    const newToken = jwt.sign(
      {
        username: decoded.username,
        email: decoded.email,
        id: decoded.id
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: '1h'
      }
    );
    res.cookie("access_token", newToken, { maxAge: process.env.TOKEN_EXPIRATION * 1000, httpOnly: true, sameSite: 'none', secure: true });
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
      error: error,
      type: 'auth_failed',
    });
  }
};