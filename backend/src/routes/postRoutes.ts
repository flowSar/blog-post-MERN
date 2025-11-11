import express, {
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import {
  allPosts,
  createPost,
  destroyPost,
  showPost,
  updatePost,
} from "../controllers/postController.js";
import {
  postBodyValidation,
  postBodyValidationUpdate,
  validateMongoId,
} from "../validations/postValidation.js";
import { auth, type AuthRequest } from "../middleware/authMiddleware.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import {
  verifyOwnership,
  verifyPermissions,
} from "../middleware/permissions/postPermissions.js";

const postRouter = express.Router();

postRouter.get("/", allPosts);

postRouter.get("/:id", validateMongoId, showPost);

postRouter.post("/", postBodyValidation, auth, createPost);

postRouter.put(
  "/:id",
  validateMongoId,
  postBodyValidationUpdate,
  auth as RequestHandler,
  verifyOwnership,
  updatePost
);

postRouter.delete(
  "/:id",
  validateMongoId,
  auth,
  verifyOwnership,
  verifyRoles("user", "admin"),
  verifyPermissions("delete_post"),
  destroyPost
);

export default postRouter;
