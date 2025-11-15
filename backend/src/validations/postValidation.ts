import type { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { parseValidationErrors } from "../utils/functions.js";
import type { ErrorInterface } from "../utils/types.js";
import CustomError from "../errors/customError.js";

export const postBodyValidationUpdate = [
  body("title")
    .optional()
    .isString()
    .withMessage("title should be string")
    .isLength({ min: 6, max: 255 })
    .withMessage("title should be 6 characters or more"),
  body("content")
    .optional()
    .isString()
    .withMessage("content should be string")
    .isLength({ min: 100 })
    .withMessage("post content should be longer than 100 character"),
  body("description")
    .optional()
    .isString()
    .withMessage("description should be string")
    .isLength({ min: 100 })
    .withMessage("post description should be longer than 100 character"),
  body("coverImage")
    .optional()
    .isURL()
    .withMessage("the cover URL is not valid"),
  body("category")
    .optional()
    .isString()
    .withMessage("category should be string")
    .isLength({ min: 3, max: 255 }),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: parseValidationErrors(result.array() as ErrorInterface[]),
      });
    }
    next();
  },
];

export const postBodyValidation = [
  body("title")
    .notEmpty()
    .withMessage("title field is missing")
    .isString()
    .withMessage("title should be string")
    .isLength({ min: 6, max: 255 })
    .withMessage("title should be 6 characters or more"),
  body("content")
    .notEmpty()
    .withMessage("post content is required")
    .isString()
    .withMessage("content should be string")
    .isLength({ min: 100 })
    .withMessage("post content should be longer than 100 character"),
  body("description")
    .notEmpty()
    .withMessage("post description is required")
    .isString()
    .withMessage("description should be string")
    .isLength({ min: 50 })
    .withMessage("post description should be longer than 50 character"),
  body("coverImage")
    .notEmpty()
    .withMessage("post cover is required")
    .isURL()
    .withMessage("the cover URL is not valid"),
  body("category")
    .optional()
    .isString()
    .withMessage("category should be string")
    .isLength({ min: 3, max: 255 }),
  body("isPublished").optional().isBoolean().withMessage("boolean"),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: parseValidationErrors(result.array() as ErrorInterface[]),
      });
    }
    next();
  },
];

export const validateMongoId = [
  param("id")
    .notEmpty()
    .withMessage("id is missing")
    .isMongoId()
    .withMessage("id is not mongo valid id"),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = parseValidationErrors(result.array() as ErrorInterface[]);

      return res.failure({
        statusCode: 400,
        errors: errors,
        message: "id validtion failed",
      });
    }
    next();
  },
];
