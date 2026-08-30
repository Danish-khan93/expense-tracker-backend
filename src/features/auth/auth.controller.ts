import { type Request, type Response } from "express";

// register
export const registerUser = (req: Request, res: Response) => {
  console.log(req.body);
//   console.log(res);
};

// login
export const loginUser = (req: Request, res: Response) => {
  console.log(req.body);
  console.log(res);
};
