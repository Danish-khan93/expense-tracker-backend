import { type Request, type Response } from "express";
import type { LoginUser, ReqDataType } from "./auth.types.ts";
import { LoginUserSerivce, registerUserService } from "./auth.service.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import { verifyToken } from "../../utilities/tokenVerify.ts";
import { ApiError } from "../../utilities/customError.ts";
import { prisma } from "../../db.ts";
import { generateToken } from "./auth.utilies.ts";

// register
export const registerUser = async (req: Request, res: Response) => {
  // valid data come from middelware and store in req.validatedData
  const data = req.validatedData as ReqDataType;

  // call the service function to register the user
  const finalData = await registerUserService(data);
  // console.log(finalData);

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
      new GlobalResponse("success", 200, userDetail, "User Login successfully"),
    );
};

// refresh the access token

export const refreshingToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new ApiError(401, "Session Expired, Please login again");
  }

  const checkRefreshTokenVaildity = verifyToken(
    refreshToken,
    "REFRESH_TOKEN_SECRET",
  );

  if (!checkRefreshTokenVaildity) {
    throw new ApiError(401, " Unauthorized User");
  }

  const findUserById = await prisma.user.findUnique({
    where: { id: checkRefreshTokenVaildity?.id },
  });

  if (!findUserById) {
    throw new ApiError(404, "User not found");
  }

  // console.log(findUserById);
  const tokenRegenratePayload = {
    id: findUserById.id,
    email: findUserById.email,
    name: findUserById.fullName,
  };

  const newAccessToken = generateToken(
    tokenRegenratePayload,
    "ACCESS_TOKEN_SECRET",
    "15m",
  );

  // console.log(newAccessToken, "newAccessToken");

  res.cookie("accessToken", newAccessToken, {
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
        { accessToken: newAccessToken },
        "Access token refreshed",
      ),
    );

  // first check refresh token is present or not
  // seconde check refresh token is valid or not
  // if valide gernerate the access token
  // if not vaild logout and delete the refresh token from db and cookies
};

// logout user
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new GlobalResponse("success", 200, {}, "User Logout Successfully"));
};
