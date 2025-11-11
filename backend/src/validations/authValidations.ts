import type { NextFunction, Request, Response } from "express";
import { body, Result, validationResult } from "express-validator";
import { parseValidationErrors } from "../utils/functions.js";
import type { ErrorInterface } from "../utils/types.js";

export const regitserValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is missing")
    .isString()
    .withMessage("username should be string")
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage("username should be longer than 3 charachters"),
  body("email")
    .notEmpty()
    .withMessage("email is missing")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
    .notEmpty()
    .withMessage("password is missing")
    .isLength({
      min: 6,
      max: 255,
    })
    .withMessage("password should be longer than 6 charachters"),
  body("profileImage").optional().isURL().withMessage("image url is not valid"),
  body("bio").optional().isString().withMessage("bio should be string"),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: parseValidationErrors(result.array() as ErrorInterface[]),
      });
    }
    next();
  },
];

export const logInValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is missing")
    .isString()
    .withMessage("username should be string")
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage("username should be longer than 3 charachters"),
  body("password")
    .notEmpty()
    .withMessage("password is missing")
    .isLength({
      min: 6,
      max: 255,
    })
    .withMessage("password should be longer than 6 charachters"),
];
