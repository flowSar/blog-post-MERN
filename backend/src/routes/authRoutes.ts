import express from "express";
import {
  login,
  register,
  validateToken,
} from "../controllers/authController.js";
import {
  logInValidation,
  regitserValidation,
} from "../validations/authValidations.js";
import { uploadSingle } from "../middleware/upload.js";

const authRouter = express.Router();

authRouter.post("/register", regitserValidation, register);

authRouter.post("/login", logInValidation, login);

authRouter.get("/validatetoken", validateToken);

export default authRouter;
