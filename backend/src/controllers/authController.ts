import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import type {
  JwtPayloadInterface,
  LoginRequestBody,
  RegisterRequestBody,
} from "../utils/types.js";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      profileImage,
    }: RegisterRequestBody = req.body;

    const foundUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      return res.status(400).json({
        success: false,
        errors: {
          register: "User with this email or username already exists",
        },
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      bio,
      profileImage,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "register failed" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("erver error: ", error);
    return res.status(500).json({
      success: false,
      errors: {
        register: "server error",
      },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, email, password, rememberme }: LoginRequestBody =
      req.body;

    const foundUser = await User.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!foundUser) {
      return res.status(400).json({
        success: false,
        errors: {
          login: "User with this email or username does not exist",
        },
      });
    }

    const validatePassword = await bcrypt.compare(password, foundUser.password);

    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        message: "Password is not valid",
        user: { username, email },
      });
    }
    const payload = {
      id: foundUser._id,
      username: foundUser?.username,
      email: foundUser?.email,
      profileImage: foundUser?.profileImage,
      bio: foundUser?.bio,
      role: foundUser.role,
      permissions: foundUser.permissions,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: rememberme ? "30d" : "7d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: rememberme ? "30d" : "7d",
    });

    // res.cookie(refreshToken, {httpOnly: true, secure: true, });

    return res
      .status(200)
      .json({ success: true, token: accessToken, user: foundUser });
  } catch (error) {
    console.log("erver error: ", error);
    return res.status(500).json({
      sucess: false,
      errors: {
        login: "server error",
      },
    });
  }
};

export const validateToken = (req: Request, res: Response) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({ message: "No token provided" });
    }
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Token missing or malformed" });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "token is not valid" });
      }

      return res
        .status(200)
        .json({ success: true, message: "token is valid", token, user });
    });
  } catch (error) {
    console.log("erver error: ", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const refreshToken = (req: Request, res: Response) => {};
