import { type Request, type Response } from "express";
import type { ReqDataType } from "./auth.types.ts";
// register
export const registerUser = (req: Request, res: Response) => {
  const data = req.body as ReqDataType;
  console.log("data is valid");

  // 1- check user already exist in database
  // 2- if not exist then create new user in database
  // 3- password hashing
};

// // login
// export const loginUser = (req: Request, res: Response) => {
//   console.log(req.body);
//   // console.log(res);
// };
