import express from "express";
import { authRouter } from "./features/auth/auth.routes.ts";

const routes = express.Router();

const v1 = "/api/v1";

routes.use(`${v1}/auth`, authRouter);

export { routes };


