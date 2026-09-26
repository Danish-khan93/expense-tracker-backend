import { type NextFunction, type Request, type Response } from "express";
import { categorySchema } from "./categories.schema.ts";
import type { CategoryCreate } from "./categories.type.ts";
import { ApiError } from "../../utilities/customError.ts";
import { ValidationError } from "yup";

export const categoryValidateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { categoryName, icon, color, description } =
    req?.body as CategoryCreate;

  try {
    // validation
    const validateCategory = categorySchema.validate(
      { categoryName },
      {
        abortEarly: true,
      },
    );
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ApiError(400, "Validation error", error.errors);
    }
  }
};
