import express from "express";
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
import { verifyOwnership } from "../middleware/permissions/postPermissions.js";
import { verifyPermissions } from "../middleware/permissions/permessions.js";

const postRouter = express.Router();

postRouter.get("/", allPosts);

postRouter.get("/:id", validateMongoId, showPost);

// no any one can create post, so we need to verify the permession , becuase we can remove create permission on a user
postRouter.post(
  "/",
  postBodyValidation,
  auth,
  verifyPermissions("create_post"),
  createPost
);

postRouter.put(
  "/:id",
  validateMongoId,
  postBodyValidationUpdate,
  auth,
  verifyOwnership,
  updatePost
);

postRouter.delete(
  "/:id",
  validateMongoId,
  auth,
  verifyOwnership,
  verifyRoles("user", "admin", "moderator"),
  verifyPermissions("delete_post"),
  destroyPost
);

export default postRouter;
