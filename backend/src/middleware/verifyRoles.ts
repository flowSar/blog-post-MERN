import type { NextFunction, Request, Response } from "express";
import { verifyOwnership } from "./permissions/postPermissions.js";

export const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    // const roles = ["user", "mederator"];

    const result = allowedRoles
      .map((role) => role === userRole)
      .find((value) => value === true);

    if (!allowedRoles.includes(userRole)) {
      return res.failure({
        statusCode: 403,
        errors: { permession: "unauthorized" },
        message: "you are not authorized for this action",
      });
    }

    next();
  };
};
