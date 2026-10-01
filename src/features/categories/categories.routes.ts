import express from "express";
import {
  categoryValidateMiddleware,
  categoryValidateUpdateMiddleware,
} from "./catgegories.middleware.ts";
import {
  createCategory,
  getCategoryById,
  getCateogryByType,
  updateCategory,
} from "./categories.controller.ts";
import { getCategoryByIdService } from "./categories.service.ts";

const categoriesRoutes = express.Router();

// create cateogry route
categoriesRoutes.post("/create", categoryValidateMiddleware, createCategory);
// update category api
categoriesRoutes.patch(
  "/updateCateogryById/:id",
  categoryValidateUpdateMiddleware,
  updateCategory,
);

// get by id category

categoriesRoutes.get("/categoryById/:id", getCategoryById);


//get all category by qurey expense and income

categoriesRoutes.get("/getAllCategoryByType",getCateogryByType)






export { categoriesRoutes };
