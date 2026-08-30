export function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };
}

/* 
| Kondisi                             |        Status |
| ----------------------------------- | ------------: |
| Tidak ada JWT                       |         `401` |
| JWT invalid                         |         `401` |
| JWT valid + role user + akses admin |         `403` |
| JWT valid + role admin              | `200/201/204` |

*/
