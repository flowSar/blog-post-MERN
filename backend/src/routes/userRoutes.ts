import express from "express";
import { getUserPosts } from "../controllers/postController.js";
import {
  deleteUser,
  getUsers,
  updateUser,
  updateUserRolePermissions,
} from "../controllers/userControllers.js";
import { validateMongoId } from "../validations/postValidation.js";
import { validateUserAccessCUpdate } from "../validations/userValidation.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { auth } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.delete("/:id", validateMongoId, deleteUser);

userRouter.get("/:id/posts", validateMongoId, getUserPosts);

userRouter.put("/:id", validateMongoId, updateUser);

userRouter.put(
  "/:id/access-controle",
  validateUserAccessCUpdate,
  auth,
  verifyRoles("admin"),
  updateUserRolePermissions
);

export default userRouter;
