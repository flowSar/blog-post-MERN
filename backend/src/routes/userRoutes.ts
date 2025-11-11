import express from "express";
import { getUserPosts } from "../controllers/postController.js";
import { deleteUser, getUsers } from "../controllers/userControllers.js";
import { validateMongoId } from "../validations/postValidation.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.delete("/:id", validateMongoId, deleteUser);

userRouter.get("/:id/posts", validateMongoId, getUserPosts);

export default userRouter;
