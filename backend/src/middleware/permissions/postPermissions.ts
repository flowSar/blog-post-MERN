import type { NextFunction, Request, Response } from "express";
import Post from "../../models/Post.js";

export const verifyOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const role = req.user.role;
  if (role !== "user") {
    return next();
  }
  const post = await Post.findById(id);
  if (post == null) {
    return res.failure({
      statusCode: 404,
      errors: {},
      message: "post was not found",
    });
  }

  if (userId !== post.author.toString()) {
    return res.failure({
      statusCode: 403,
      errors: { permission: "unuthorized" },
      message: "you are not the owner, unauthorized",
    });
  }
  next();
};

const canView = (req: Request, res: Response) => {};

const canUpdate = (req: Request, res: Response) => {};

const canDelete = (req: Request, res: Response) => {};
