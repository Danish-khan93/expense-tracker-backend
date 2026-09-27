import express from "express";
import { categoryValidateMiddleware } from "./catgegories.middleware.ts";
import { createCategory } from "./categories.controller.ts";

const categoriesRoutes = express.Router();

// create cateogry route
categoriesRoutes.post("/create", categoryValidateMiddleware, createCategory);

export { categoriesRoutes };
