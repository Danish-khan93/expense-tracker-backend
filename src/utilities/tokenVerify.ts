import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "./customError.ts";
dotenv.config();

type tokenSecretKy = "REFRESH_TOKEN_SECRET" | "ACCESS_TOKEN_SECRET";

export const verifyToken = (token: string, secretKey: tokenSecretKy) => {
  const key = process.env[secretKey];
  if (key) {
    const response = jwt.verify(token, key);
    if (typeof response === "string") {
      throw new ApiError(401, "Invalid token payload");
    }

    return response;
  } else {
    throw new ApiError(401, "Unauthorized");
  }
};
