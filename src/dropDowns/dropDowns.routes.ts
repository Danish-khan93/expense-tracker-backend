import express from "express";
import { getAllCategoryType, getAllPaymentTypeController } from "./dropDowns.controller.ts";

const dropDownsRoutes = express.Router();

dropDownsRoutes.get("/getAllPaymentType", getAllPaymentTypeController);
dropDownsRoutes.get("/getCategoryType", getAllCategoryType);

export { dropDownsRoutes };
