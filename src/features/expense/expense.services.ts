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
    paymentMetodeId: Number(data?.paymentMetodeId),
    note: data.note ?? "",
    dateOfPayment: data.dateOfPayment,
    statusId: Number(data.statusId),
    status: data.statusName,
  };

  const findVaildCategoryByUser = await prisma.category.findUnique({
    where: {
      userId,
      id: updateData.categoryId,
    },
  });

  if (!findVaildCategoryByUser) {
    throw new ApiError(404, "The Category Not Found");
  }

  const createExpense = await prisma.expense.create({
    data: updateData,
  });
  if (!createExpense) {
    throw new ApiError(500, "Expense creation failed");
  }

  return createExpense;
};

// get all expense by user id

export const getAllExpenseService = async (id: number) => {
  const getAllExpense = await prisma.expense.findMany({
    where: {
      userId: id,
    },
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });
  if (!getAllExpense) {
    throw new ApiError(404, "There is not expense In this User");
  }

  const allExpense = getAllExpense.map(({ category, ...val }) => {
    return {
      ...val,
      categoryName: category?.categoryName,
    };
  });

  return allExpense;
};

// get single expense

export const getSingleExpenseService = async (userId: number, id: number) => {
  const getSingleExpense = await prisma?.expense.findUnique({
    where: {
      userId,
      id,
    },
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  if (!getSingleExpense) {
    throw new ApiError(404, "Expense Not Found");
  }

  const { categoryId, category, status, paymentType, ...data } =
    getSingleExpense;

  const finalData = {
    ...data,
    expenseCategoryName: category?.categoryName,
    expenseCategoryId: categoryId,
    statusName: status,
    paymentMetodeName: paymentType,
  };
  return finalData;
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

      ...(data.dateOfPayment !== undefined && {
        dateOfPayment: data.dateOfPayment,
      }),
    },
  });

  if (!updateExpense) {
    throw new ApiError(500, "Expense can not Update Successfully");
  }
  return updateExpense;
};
