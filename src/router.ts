import express from "express";
import { authRouter } from "./features/auth/auth.routes.ts";
import { categoriesRoutes } from "./features/categories/categories.routes.ts";
import { expenseRoute } from "./features/expense/expense.routes.ts";

const routes = express.Router();

const v1 = "/api/v1";

// public routes

routes.use(`${v1}/auth`, authRouter);
routes.use(`${v1}/category`, categoriesRoutes);
routes.use(`${v1}/expense`, expenseRoute);

export { routes };
