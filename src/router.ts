import express from "express";
import { authRouter } from "./features/auth/auth.routes.ts";
import { categoriesRoutes } from "./features/categories/categories.routes.ts";
import { expenseRoute } from "./features/expense/expense.routes.ts";
import { authGuard } from "./middlewares/authGuard.ts";
import { dropDownsRoutes } from "./dropDowns/dropDowns.routes.ts";

const routes = express.Router();

const v1 = "/api/v1";

// public routes
routes.use(`${v1}/auth`, authRouter);

// private routes
routes.use(`${v1}/category`, authGuard, categoriesRoutes);
routes.use(`${v1}/expense`, authGuard, expenseRoute);


// this dropdown no need to authGuard because this is public route

routes.use(`${v1}/dropDowns`, dropDownsRoutes);

export { routes };
