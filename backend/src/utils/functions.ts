import type { ErrorInterface } from "./types.js";

export const parseValidationErrors = (errors: ErrorInterface[]) => {
  let parsedErrors: Record<string, string> = {};
  let path = "";
  for (const error of errors) {
    if (error.path !== path) {
      parsedErrors[error.path] = error.msg;

      path = error.path;
    }
  }
  return parsedErrors;
};
