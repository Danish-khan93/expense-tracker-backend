import type { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import { ApiError } from "../../utilities/customError.ts";
import {
  loginValidationSchema,
  registrationValidationSchema,
} from "./auth.schema.ts";
import { ValidationError } from "yup";

export const registerUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const validatedData = await registrationValidationSchema.validate(data, {
      abortEarly: false, // Validate all fields and return all errors,
    });
    req.validatedData = validatedData; // Store the validated data in the request object
    next();
  } catch (err) {
    console.log(err);

    const validationError = err as yup.ValidationError;
    console.log(validationError?.message);
    throw new ApiError(400, "Validation error", validationError?.errors || []);
  }
};

export const loginUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loginValidation = await loginValidationSchema.validate(req.body);

    req.validatedData = loginValidation;
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ApiError(400, "Validation error", err.errors);
    }
  }
};

// // auth meddileware for all api like auth gaurd

// export const authGaurd = (req:Request,res:Response,next:NextFunction)=>{

// const accessToken  =

// }
