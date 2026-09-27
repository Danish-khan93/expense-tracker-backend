import express from "express";
import { categoryValidateMiddleware } from "./catgegories.middleware.ts";
import { createCategory } from "./categories.controller.ts";

const categoriesRoutes = express.Router();

categoriesRoutes.get("/categories/getAllCategories");
categoriesRoutes.post("/categories/create", categoryValidateMiddleware,createCategory);
categoriesRoutes.put("/categories/update");

export { categoriesRoutes };
