import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { JwtPayloadInterface } from "../utils/types.js";

export interface AuthRequest {
  user: JwtPayloadInterface;
}

// extend Request
declare global {
  namespace Express {
    interface Request extends AuthRequest {}
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.failure({
        statusCode: 401,
        errors: {},
        message: "Token missing or malformed",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.failure({
          statusCode: 401,
          errors: {},
          message: "token is not valid",
        });
      }

      req.user = user as JwtPayloadInterface;

      next();
    });
  } catch (error) {
    return res.failure({
      statusCode: 500,
      errors: {},
      message: "server error",
    });
  }
};
