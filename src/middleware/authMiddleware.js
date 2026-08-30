import { verifyToken } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header is required',
      });
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format',
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}
