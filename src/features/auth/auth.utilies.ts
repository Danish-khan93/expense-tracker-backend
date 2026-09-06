import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

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
  secret: jwt.Secret,
  expires: jwt.SignOptions["expiresIn"],
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expires ? expires : "15m",
  });
  return token;
};

// export const verifyToken = () => {};
