import type { PaymentType } from "../../generated/prisma/enums.ts";

export type CREATEEXPENSETYPE = {
  amount: string;
  title: string;
  expenseCategoryId: number;
  expenseCategoryName: string;
  paymentMetodeId: number;
  paymentMetodeName: PaymentType;
  note?: string;
  date: string;
};

export type UpdateExpenseType = CREATEEXPENSETYPE & { id: number };
