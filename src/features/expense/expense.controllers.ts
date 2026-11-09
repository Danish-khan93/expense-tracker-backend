import { type Request, type Response } from "express";
import {
  createExpenseService,
  getAllExpenseService,
  getSingleExpenseService,
  updateExpense,
} from "./expense.services.ts";
import type { CREATEEXPENSETYPE } from "./expense.type.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";

// get All expense
export const getAllExpenseController = async (req: Request, res: Response) => {
  const userId = req?.userId;
  console.log(userId);

  const getAllExpense = await getAllExpenseService(userId);

  res
    .status(200)
    .json(
      new GlobalResponse(
        "Success",
        200,
        getAllExpense,
        "Expense List Successfully",
      ),
    );
};
// Create expense
export const createExpenseController = async (req: Request, res: Response) => {
  const data = req.body as CREATEEXPENSETYPE;
  const userId = req?.userId;
  const createExpense = await createExpenseService(data, userId);

  res
    .status(200)
    .json(
      new GlobalResponse(
        "Success",
        200,
        createExpense,
        "Expense Create Successfully",
      ),
    );
};
// get by id expense
export const getByIdExpenseController = async (req: Request, res: Response) => {
  const userId = req?.userId;
  const { id } = req?.params;
  console.log(id);

  const getSingleExpense = await getSingleExpenseService(userId, Number(id));
  console.log(getSingleExpense);

  res
    .status(200)
    .json(
      new GlobalResponse(
        "Success",
        200,
        getSingleExpense,
        "Get Sinlge Expense Successfully",
      ),
    );
};
// update By id expense
export const updateByIdExpenseController = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);
  const userId = req?.userId;
  const data = req?.body;

  const updatedExpense = await updateExpense(userId, data, id);
  console.log(updatedExpense);

  res
    .status(200)
    .json(
      new GlobalResponse(
        "Success",
        200,
        updatedExpense,
        "Update Expense Successfully",
      ),
    );
};
