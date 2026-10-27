import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utilities/tokenVerify.ts";
import { ApiError } from "../utilities/customError.ts";
import { prisma } from "../db.ts";
import type { JwtPayload } from "jsonwebtoken";
export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.cookies?.accessToken;

  // if not token

  if (!data) {
    throw new ApiError(401, "Unauthorized User");
  }

  // verify token

  const verifying = verifyToken(data, "ACCESS_TOKEN_SECRET");
  if (!verifying) {
    throw new ApiError(401, "Unauthorized User");
  }

  const findBYTokenId = await prisma.user.findUnique({
    where: { id: verifying?.id },
  });

  if (!findBYTokenId) {
    throw new ApiError(401, "Unauthorized User");
  }
  // Attach the authenticated user's ID to the request
  req.userId = findBYTokenId.id;

  next();
};
