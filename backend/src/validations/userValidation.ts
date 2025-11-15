import type { NextFunction, Response, Request } from "express";
import {
  body,
  matchedData,
  param,
  validationResult,
  type ValidationError,
} from "express-validator";
import { parseValidationErrors } from "../utils/functions.js";
import type { ErrorInterface } from "../utils/types.js";

const allowedRoles = ["user", "admin", "moderator"];

export const validateUserAccessCUpdate = [
  param("id")
    .notEmpty()
    .withMessage("id is missing")
    .isMongoId()
    .withMessage("id is not mongo valid id"),
  body("role")
    .optional()
    .isIn(allowedRoles)
    .withMessage(`Role must be one of: ${allowedRoles.join(", ")}`)
    .isString()
    .withMessage("role should be string"),
  body("permissions")
    .optional()
    .isArray()
    .withMessage("permissions should be a list of permissions"),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = parseValidationErrors(result.array() as ErrorInterface[]);
      return res.failure({
        statusCode: 400,
        errors: errors,
        message: "validation failed",
      });
    }
    next();
  },
];
