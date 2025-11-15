import type { ErrorRequestHandler, Request, Response } from "express";

export const ErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response
) => {
  const statusCode = err.statusCode || 500;
  const errors = err.errors || {};
  const message = err.message || "server error";

  return res.status(statusCode).json({ success: false, errors, message });
  //   return res.failure({ statusCode, errors, message });
};
