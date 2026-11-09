import { type Request, type Response } from "express";
import { GlobalResponse } from "../utilities/GlobalResponse.ts";
import { getAllCategoryTypeService, getAllPaymentTypeService } from "./dropDowns.services.ts";

export const getAllPaymentTypeController = (req: Request, res: Response) => {
  const PaymentType = getAllPaymentTypeService();



  res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        PaymentType,
        "Get All Payment Type Successfully",
      ),
    );
};
export const getAllCategoryType = (req: Request, res: Response) => {
  const categoryType = getAllCategoryTypeService();



  res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        categoryType,
        "Get All Payment Type Successfully",
      ),
    );
};
