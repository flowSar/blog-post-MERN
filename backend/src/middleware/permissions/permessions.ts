import type { NextFunction, Request, Response } from "express";

export const verifyPermissions = (...permissons: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authPermessions = req.user.permissions;
    const hasAllPermissions = permissons.every((permission) =>
      authPermessions.includes(permission)
    );

    if (!hasAllPermissions) {
      return res.failure({
        statusCode: 403,
        errors: { permission: "unauthorized!" },
        message: "you don't have permissions for this Action",
      });
    }
    next();
  };
};
