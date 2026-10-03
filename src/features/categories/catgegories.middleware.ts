import { type NextFunction, type Request, type Response } from "express";
import { categorySchema, categoryUpdateSchema } from "./categories.schema.ts";
import type { CategoryCreate, CategoryResponse } from "./categories.type.ts";
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
    userId,
  } = req?.body as CategoryCreate;

  try {
    // validation
    const validateCategory = await categorySchema.validate(
      { categoryName, categoryType, categoryTypeId },
      {
        abortEarly: true,
      },
    );

    req.validatedData = {
      ...validateCategory,
      icon,
      color,
      description,
      userId,
    };

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ApiError(400, "Validation error", error.errors);
    }
  }
};

// update category validation
export const categoryValidateUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req?.body as CategoryResponse;

  try {
    // validation
    const validateCategory = await categoryUpdateSchema.validate(
      { ...data },
      {
        abortEarly: true,
      },
    );

    req.validatedData = validateCategory;

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ApiError(400, "Validation error", error.errors);
    }
  }
};
