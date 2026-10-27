import express from "express";
import {
  loginUser,
  logoutUser,
  refreshingToken,
  registerUser,
} from "./auth.controller.ts";
import {
  registerUserValidation,
  loginUserValidation,
} from "./auth.middelware.ts";
import { authGuard } from "../../middlewares/authGuard.ts";
const authRouter = express.Router();

// register router
authRouter.post("/register", registerUserValidation, registerUser);
// login router
authRouter.post("/login", loginUserValidation, loginUser);
authRouter.get("/logout", authGuard, logoutUser);

authRouter.get("/refresh", refreshingToken);

export { authRouter };
