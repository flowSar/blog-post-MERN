// import type { ErrorRequestHandler, Request, Response } from "express";

// export const ErrorHandler: ErrorRequestHandler = (
//   err: any,
//   req: Request,
//   res: Response
// ) => {
//   const statusCode = err.statusCode || 500;
//   const errors = err.errors || {};
//   const message = err.message || "server error";

//   return res.status(statusCode).json({ success: false, errors, message });
//   //   return res.failure({ statusCode, errors, message });
// };

import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
