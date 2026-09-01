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

export const generateToken = (payload: object, secret: jwt.Secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

// export const verifyToken = () => {};
