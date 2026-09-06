import { prisma } from "../../db.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import type { ReqDataType } from "./auth.types.ts";
import { passwordHash, generateToken } from "./auth.utilies.ts";
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
    console.log("checkUserAlreadyExist", checkUserAlreadyExist);

    if (!checkUserAlreadyExist) {
      // hashing password

      const hashedPassword = await passwordHash(data.password);
      console.log(hashedPassword);

      // generate access token and refresh token

      const accessToken = generateToken(
        { ...data, password: hashedPassword },
        process.env.ACCESS_TOKEN_SECRET as string,
        "15m",
      );
      const refreshToken = generateToken(
        { ...data, password: hashedPassword },
        process.env.REFRESH_TOKEN_SECRET as string,
        "7d",
      );

      const createUser = await prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword,
          refreshToken: refreshToken,
        },
      });

      if (!createUser) {
        console.log(createUser);
        return "User not created";
      }

      return { createUser, accessToken };
    }
    return "User already exist";
  } catch (error: Error | any) {
    console.log("Error in registerUserService:", error);
    throw new Error(error);
  }

  // if not exist then create new user in database
  // hash pass and tokens
};
