import type { NextFunction, Request, Response } from "express";
import { expenseValidationSchema } from "./expenseValidation.scheme.ts";
import type { ValidationError } from "yup";
import { ApiError } from "../../utilities/customError.ts";

export const expenseValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const validateExpenseData = await expenseValidationSchema.validate(data, {
      abortEarly: false,
    });


    next();
  } catch (error) {
    const err = error as ValidationError;
    throw new ApiError(400, "Validation error", err.errors || []);
  }
};
