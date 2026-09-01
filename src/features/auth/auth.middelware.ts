import type { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";

// schema

const validation = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const registorUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const validatedData = await validation.validate(data, {
      abortEarly: false, // Validate all fields and return all errors,
    });
    // return validatedData;
    next();
  } catch (err) {
    const ValidationError = err as yup.ValidationError;
    return res
      .status(400)
      .json(
        new GlobalResponse(
          "error",
          400,
          ValidationError.errors,
          ValidationError?.message || "Validation error",
        ),
      );
  }
};
