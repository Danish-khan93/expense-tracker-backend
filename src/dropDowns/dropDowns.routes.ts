import express from "express";
import {
  getAllCategoryType,
  getAllPaymentTypeController,
  getAllStatus,
} from "./dropDowns.controller.ts";

const dropDownsRoutes = express.Router();

dropDownsRoutes.get("/getAllPaymentType", getAllPaymentTypeController);
dropDownsRoutes.get("/getCategoryType", getAllCategoryType);
dropDownsRoutes.get("/getStatus", getAllStatus);

export { dropDownsRoutes };
