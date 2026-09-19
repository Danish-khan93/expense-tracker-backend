import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../../utilities/customError.ts";
import dotenv from "dotenv";
dotenv.config();
// pass hash so save hash pass in database
export const passwordHash = async (password: string) => {
  const hashPass = await hash(password, 10);
  return hashPass;

};

// pass hash so save hash pass in database
export const compareHashPass = async (
  password: string,
  oldHashPassword: string,
) => {
  const isMatch = await compare(password, oldHashPassword);
  return isMatch;
};

export const generateToken = (
  payload: object,
  secret: string,
  expires: jwt.SignOptions["expiresIn"],
) => {
  const token = jwt.sign(payload, process.env[secret] as jwt.Secret, {
    expiresIn: expires ? expires : "15m",
  });
  return token;
};

// export const verifyToken = () => {};
