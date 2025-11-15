import type { Request, Response } from "express";
import User from "../models/User.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.success({
      statusCode: 200,
      data: users,
      message: "users reyreived successfully",
    });
  } catch (error) {
    return res.failure({});
  }
};

export const deleteUser = (req: Request, res: Response) => {};

export const updateUser = async (req: Request, res: Response) => {};

export const updateUserRolePermissions = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { role, permissions } = req.body;

  try {
    // return res.status(200).json({ role, permissions });

    const user = await User.findByIdAndUpdate(
      id,
      {
        permissions,
        role,
      },
      { new: true }
    );
    return res.success({
      statusCode: 200,
      data: user,
      message: "user roles updated successfully",
    });
  } catch (error) {
    console.log("server error: ", error);
    return res.failure({});
  }
};
