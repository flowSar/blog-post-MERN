import type { Request, RequestHandler, Response } from "express";
import Post from "../models/Post.js";
import type { CustomResponse, PostInterface } from "../utils/types.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const allPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "username");

    res.success({
      statusCode: 200,
      data: posts,
      message: "all posts were retreived",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.failure({});
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    // const authReq = req as AuthRequest;

    const { title, content, description, coverImage }: PostInterface = req.body;
    //   const user = req.user;
    const slug = title.replaceAll(" ", "-");
    const newPost = await Post.create({
      title,
      content,
      description,
      slug,
      coverImage,
      author: req.user.id,
    });
    if (!newPost) {
      return res
        .status(401)
        .json({ success: false, message: "post creation failed" });
    }
    return res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, coverImage } = req.body;
  let slug = "";

  slug = title.replaceAll(" ", "-");

  try {
    const newPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        content,
        coverImage,
      },
      { new: true } // return the updated document
    );
    if (!newPost) {
      return res.status(400).json({
        success: false,
        message: `updated failed be sure to provide valid id id:${id}`,
      });
    }

    return res.status(200).json({ success: true, post: newPost });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};

export const showPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: `post with id:${id} was not found` });
    }
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};

export const destroyPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `post with id:${id} was not found, delete failed`,
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({ author: id });

    if (!posts) {
      return res.failure({
        statusCode: 404,
        errors: {},
        message: "posts not found",
      });
    }

    return res.success({
      statusCode: 200,
      data: posts,
      message: "user posts retreived successfully",
    });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};
