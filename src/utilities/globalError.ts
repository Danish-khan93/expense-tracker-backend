import { type NextFunction, type Request, type Response } from "express";
import type { ApiError } from "./customError.ts";

export const globalError = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(error.statusCode || 500).json({
    code: error.statusCode || 500,
    status: "failed",
    message: error.message,
    error: error.error || [],
  });
};
