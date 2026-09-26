import { prisma } from "../../db.ts";
import { ApiError } from "../../utilities/customError.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import type { LoginUser, ReqDataType } from "./auth.types.ts";
import {
  passwordHash,
  generateToken,
  compareHashPass,
} from "./auth.utilies.ts";
import dotenv from "dotenv";
dotenv.config();

export const registerUserService = async (data: ReqDataType) => {
  // email user check already in database or not
  try {
    const checkUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkUserAlreadyExist) {
      throw new ApiError(409, "User already exist with this email");
    }
    // hashing password

    const hashedPassword = await passwordHash(data.password);
    // create user

    const createUser = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      throw new ApiError(500, "Error while creating user");
    }

    // generate access token and refresh token

    const accessToken = generateToken(
      {
        fullName: createUser.fullName,
        email: createUser.email,
        id: createUser.id,
      },
      "ACCESS_TOKEN_SECRET",
      "15m",
    );
    const refreshToken = generateToken(
      {
        fullName: createUser.fullName,
        email: createUser.email,
        id: createUser.id,
      },
      "REFRESH_TOKEN_SECRET",
      "7d",
    );

    const updateUser = await prisma.user.update({
      where: { id: createUser.id },
      data: { refreshToken: refreshToken },
    });

    console.log(updateUser, "updateUser");
    const successfullCreateUser = {
      fullName: createUser.fullName,
      email: createUser.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    };

    return successfullCreateUser;
  } catch (error) {
    const err = error as ApiError;
    console.log(err.message, "err.message");
    throw new ApiError(
      err.statusCode,
      err.message || "Error while registering user",
      [err.message],
    );
  }
};

export const LoginUserSerivce = async (data: LoginUser) => {
  // check user in database through email if not throw error

  const checkUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  console.log(checkUser, "checkUser");

  if (!checkUser) {
    throw new ApiError(404, "Wrong Email and password");
  }

  const comparePass = await compareHashPass(data.password, checkUser?.password);

  if (!comparePass) {
    throw new ApiError(404, "Wrong password");
  }

  // tokens generate and if

  // generate access token and refresh token

  const accessToken = generateToken(
    {
      fullName: checkUser.fullName,
      email: checkUser.email,
      id: checkUser.id,
    },
    "ACCESS_TOKEN_SECRET",
    "15m",
  );
  const refreshToken = generateToken(
    {
      fullName: checkUser.fullName,
      email: checkUser.email,
      id: checkUser.id,
    },
    "REFRESH_TOKEN_SECRET",
    "7d",
  );

  // update token in login time

  const updateUserData = await prisma.user.update({
    where: {
      id: checkUser.id,
    },
    data: {
      refreshToken,
    },
  });

  if (!updateUserData) {
    throw new ApiError(500, "Server faild");
  }

  return {...updateUserData,accessToken}
};
