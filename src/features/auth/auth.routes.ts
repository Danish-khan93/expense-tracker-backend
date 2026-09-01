import express from "express";
import { 
    // loginUser,
     registerUser } from "./auth.controller.ts";
import { registorUserValidation } from "./auth.middelware.ts";
const authRouter = express.Router();

// register router
// validation middelware call check data before controller
authRouter.post("/register", registorUserValidation, registerUser);
// login router
// authRouter.post("/login", loginUser);

export { authRouter };
