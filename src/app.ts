import cors from "cors";
import express, { type Express } from "express";
import { routes } from "./router.ts";
import { globalError } from "./utilities/globalError.ts";
import cookieParser from "cookie-parser";

const app: Express = express();

// common middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes api
app.use(routes);

// global error handler
app.use(globalError);

export { app };
