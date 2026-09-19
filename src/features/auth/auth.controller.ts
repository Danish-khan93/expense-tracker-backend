import { type Request, type Response } from "express";
import type { LoginUser, ReqDataType } from "./auth.types.ts";
import { LoginUserSerivce, registerUserService } from "./auth.service.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";

// register
export const registerUser = async (req: Request, res: Response) => {
  // valid data come from middelware and store in req.validatedData
  const data = req.validatedData as ReqDataType;

  // call the service function to register the user
  const finalData = await registerUserService(data);
  console.log(finalData);
  const { refreshToken, accessToken, ...userData } = finalData;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Set to true in production
    secure: false, // Set to true in production
    sameSite: "strict", // Adjust based on your requirements
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Set to true in production
    secure: false, // Set to true in production
    sameSite: "strict", // Adjust based on your requirements
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
  });

  return res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        userData,
        "User registered successfully",
      ),
    );
};

export const loginUser = async (req: Request, res: Response) => {
  const data = req.validatedData as LoginUser;

  const successLogin = await LoginUserSerivce(data);

  const { refreshToken, accessToken, password, ...userDetail } = successLogin;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Set to true in production
    secure: false, // Set to true in production
    sameSite: "strict", // Adjust based on your requirements
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Set to true in production
    secure: false, // Set to true in production
    sameSite: "strict", // Adjust based on your requirements
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
  });

  return res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        userDetail,
        "User registered successfully",
      ),
    );
};
