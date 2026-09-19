import express from "express";
import { loginUser, registerUser } from "./auth.controller.ts";
import {
  registerUserValidation,
  loginUserValidation,
} from "./auth.middelware.ts";
const authRouter = express.Router();

// register router
authRouter.post("/register", registerUserValidation, registerUser);
// login router
authRouter.post("/login", loginUserValidation, loginUser);

export { authRouter };
