import { type Request, type Response } from "express";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import type { CategoryCreate, CategoryUpdate } from "./categories.type.ts";
import {
  categoryCreateSerive,
  categoryUpdatedSerivce,
  getCategoryByIdService,
  getCategoryByTypeSerivce,
} from "./categories.service.ts";
import { ApiError } from "../../utilities/customError.ts";

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

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, "controller1");

  // service call to get category
  if (!id) {
    throw new ApiError(404, "category Not found");
  }
  const getCategory = await getCategoryByIdService(+id);

  console.log(getCategory, "controller2");
  return res
    .status(200)
    .json(
      new GlobalResponse(
        "Success",
        200,
        getCategory,
        "get Category Successfully",
      ),
    );
};

export const updateCategory = async (req: Request, res: Response) => {
  const data = req.validatedData as CategoryUpdate;
  const { id } = req?.params;

  if (!id) {
    throw new ApiError(404, "Category Not Found");
  }
  const updatedCategory = await categoryUpdatedSerivce(+id, data);
  console.log(updatedCategory, "controller");

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

// get cateogry by type

export const getCateogryByType = async (req: Request, res: Response) => {
  const { type } = req?.query;

  if (type !== "Expense" && type !== "Income") {
    throw new ApiError(400, "wrong Category Type");
  } else {
    const getByType = await getCategoryByTypeSerivce(type);
    console.log(getByType);

    res
      .status(200)
      .json(
        new GlobalResponse(
          "Success",
          200,
          getByType,
          "Category by type Successfully get",
        ),
      );
  }
};
