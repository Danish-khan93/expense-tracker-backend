import express from "express";
import { 
    // loginUser,
     registerUser } from "./auth.controller.ts";
import { reqDataValidation } from "./auth.middelware.ts";
const authRouter = express.Router();

// register router
// validation middelware call check data before controller
authRouter.post("/register", reqDataValidation, registerUser);
// login router
// authRouter.post("/login", loginUser);

export { authRouter };
