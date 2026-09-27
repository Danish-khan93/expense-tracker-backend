import express from "express";
import { categoryValidateMiddleware } from "./catgegories.middleware.ts";
import { createCategory, updateCategory } from "./categories.controller.ts";

const categoriesRoutes = express.Router();

// create cateogry route
categoriesRoutes.post("/create", categoryValidateMiddleware, createCategory);
// update category api
categoriesRoutes.patch(
  "/update/:id",
  categoryValidateMiddleware,
  updateCategory,
);
export { categoriesRoutes };
