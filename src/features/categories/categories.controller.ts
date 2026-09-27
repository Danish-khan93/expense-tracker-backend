import { type Request, type Response } from "express";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
import type { CategoryCreate } from "./categories.type.ts";
import { categoryCreateSerive } from "./categories.service.ts";

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
