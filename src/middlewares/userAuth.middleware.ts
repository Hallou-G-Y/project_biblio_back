import { Request, Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwt.utils';

interface AuthRequest extends Request {
  auth?: {
    userId: string;
    isAdmin: boolean;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userId = jwtUtils.getUserId(token);
    const isAdmin = jwtUtils.verifIsAdmin(token);
    if (userId < 0) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.auth = {
      userId: userId.toString(),
      isAdmin: isAdmin // This should be set based on the token payload
    };
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.auth?.isAdmin) {
      console.log(req.auth?.isAdmin)
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err);
    res.status(403).json({ error: "Admin access required" });
  }
};