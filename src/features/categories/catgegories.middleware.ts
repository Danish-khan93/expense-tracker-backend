import { type NextFunction, type Request, type Response } from "express";
import { categorySchema } from "./categories.schema.ts";
import type { CategoryCreate } from "./categories.type.ts";
import { ApiError } from "../../utilities/customError.ts";
import { ValidationError } from "yup";

export const categoryValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    categoryName,
    icon,
    color,
    description,
    categoryType,
    categoryTypeId,
  } = req?.body as CategoryCreate;

  try {
    // validation
    const validateCategory = await categorySchema.validate(
      { categoryName, categoryType, categoryTypeId },
      {
        abortEarly: true,
      },
    );

    req.validatedData = { ...validateCategory, icon, color, description };

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ApiError(400, "Validation error", error.errors);
    }
  }
};
