import express from "express";
import { categoryValidateMiddleware } from "./catgegories.middleware.ts";

const categoriesRoutes = express.Router();

categoriesRoutes.get("/categories/getAllCategories");
categoriesRoutes.post("/categories/create", categoryValidateMiddleware);
categoriesRoutes.put("/categories/update");

export { categoriesRoutes };
