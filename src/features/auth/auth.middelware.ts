import type { NextFunction, Request, Response } from "express";

export const reqDataValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  console.log(data);
};
