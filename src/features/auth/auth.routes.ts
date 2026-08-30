import express from "express";
import { loginUser, registerUser } from "./auth.controller.js";

const authRouter = express.Router();

// register router
authRouter.post("/register", registerUser);
// login router
authRouter.post("/login", loginUser);

export { authRouter };
