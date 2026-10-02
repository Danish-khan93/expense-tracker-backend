import express from "express";
import {
  createExpenseController,
  getAllExpenseController,
  getByIdExpenseController,
  updateByIdExpenseController,
} from "./expense.controllers.ts";
const expenseRoute = express.Router();

// get all expense

expenseRoute.get("getAllExpense", getAllExpenseController);

// create expense
expenseRoute.post("createExpense", createExpenseController);
// get expense by id
expenseRoute.get("getExpenseById/:id", getByIdExpenseController);
// update expense by id
expenseRoute.patch("updateExpense/:id", updateByIdExpenseController);

export { expenseRoute };
