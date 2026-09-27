import { type Request, type Response } from "express";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import type { CategoryCreate, CategoryUpdate } from "./categories.type.ts";
import {
  categoryCreateSerive,
  categoryUpdatedSerivce,
} from "./categories.service.ts";

export const createCategory = async (req: Request, res: Response) => {
  // create category service

  const createdCategory = req.validatedData as CategoryCreate;

  const categoryCreate = await categoryCreateSerive(createdCategory);

  console.log(categoryCreate);

  return res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        categoryCreate,
        "Category Create Successfully",
      ),
    );
};

export const updateCategory = (req: Request, res: Response) => {
  const data = req.validatedData as CategoryUpdate;

  const updatedCategory = categoryUpdatedSerivce(data);

  return res
    .status(200)
    .json(
      new GlobalResponse(
        "success",
        200,
        updatedCategory,
        "Category Create Successfully",
      ),
    );
};
