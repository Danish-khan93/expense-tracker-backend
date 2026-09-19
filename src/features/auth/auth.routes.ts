import express from "express";
import { registerUser } from "./auth.controller.ts";
import { registerUserValidation } from "./auth.middelware.ts";
const authRouter = express.Router();

// register router
authRouter.post("/register", registerUserValidation, registerUser);
// login router
// authRouter.post("/login", loginUser);

export { authRouter };
