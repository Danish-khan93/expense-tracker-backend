import { prisma } from "../../db.ts";
import { ApiError } from "../../utilities/customError.ts";
import type { CREATEEXPENSETYPE, UpdateExpenseType } from "./expense.type.ts";

export const createExpenseService = async (
  data: CREATEEXPENSETYPE,
  userId: number,
) => {
  const updateData = {
    userId: userId,
    amount: data.amount,
    title: data.title,
    categoryId: Number(data.expenseCategoryId),
    paymentType: data?.paymentMetodeName,
    note: data.note ?? "",
    dateOfPayment: data.date,
  };

  const findVaildCategoryByUser = await prisma.category.findUnique({
    where: {
      userId,
      id: data.expenseCategoryId,
    },
  });
  console.log(findVaildCategoryByUser, "findVaildCategoryByUser");

  if (!findVaildCategoryByUser) {
    throw new ApiError(404, "The Category Not Found");
  }

  const createExpense = await prisma.expense.create({
    data: updateData,
  });
  if (!createExpense) {
    throw new ApiError(500, "Expense creation failed");
  }
  console.log(createExpense);
  return createExpense;
};

// get all expense by user id

export const getAllExpenseService = async (id: number) => {
  const getAllExpense = await prisma?.expense.findMany({
    where: {
      userId: id,
    },
  });
  if (!getAllExpense) {
    throw new ApiError(404, "There is not expense In this User");
  }

  return getAllExpense;
};

export const getSingleExpenseService = async (userId: number, id: number) => {
  const getSingleExpense = await prisma?.expense.findUnique({
    where: {
      userId,
      id,
    },
  });
  console.log(getSingleExpense);

  if (!getSingleExpense) {
    throw new ApiError(404, "Expense Not Found");
  }
  return getSingleExpense;
};

export const updateExpense = async (
  userId: number,
  data: UpdateExpenseType,
  id: any,
) => {
  // find by id which expense is update

  const updatedExpense = await prisma.expense.update({
    where: {
      id,
    },
    data: {
      ...(data.title !== undefined && {
        title: data.title,
      }),

      ...(data.amount !== undefined && {
        amount: data.amount,
      }),

      ...(data.expenseCategoryId !== undefined && {
        categoryId: data.expenseCategoryId,
      }),

      ...(data.paymentMetodeName !== undefined && {
        paymentType: data.paymentMetodeName,
      }),

      ...(data.note !== undefined && {
        note: data.note,
      }),

      ...(data.date !== undefined && {
        dateOfPayment: data.date,
      }),
    },
  });
  console.log(updatedExpense);
  if (!updateExpense) {
    throw new ApiError(500, "Expense can not Update Successfully");
  }
  return updateExpense;
};
