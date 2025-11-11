import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ErrorInterface } from "../utils/types.js";

interface CustomResponse {
  success: (params: {
    statusCode: number;
    data: unknown[];
    message: string;
  }) => Response;
  failure: (params: {
    statusCode?: number;
    errors?: Record<string, string>;
    message?: string;
  }) => Response;
}

declare global {
  namespace Express {
    interface Response extends CustomResponse {}
  }
}

export const ResponseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const custRes = res as CustomResponse;
  res.success = ({ statusCode = 200, data, message }) => {
    return res.status(statusCode).json({ success: true, data, message });
  };

  res.failure = ({
    statusCode = 500,
    errors = {},
    message = "server error",
  }) => {
    return res.status(statusCode).json({ success: false, errors, message });
  };
  next();
};
