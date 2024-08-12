import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the CurrentUser interface
interface CurrentUser {
  id: string;
  role: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      currentUser: CurrentUser;
    }
  }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Extract token from cookies or headers
  if (req.cookies && req.cookies["neighbr-resident-token"]) {
    token = req.cookies["neighbr-resident-token"];
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next();
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error("JWT_SECRET is not defined."));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      role: string;
    };
    req.currentUser = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    next();
  }
};

export { currentUser };
