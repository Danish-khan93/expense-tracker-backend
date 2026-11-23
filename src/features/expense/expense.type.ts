import type { PaymentType, Status } from "../../generated/prisma/enums.ts";

export type CREATEEXPENSETYPE = {
  amount: number;
  title: string;
  expenseCategoryId: number;
  expenseCategoryName: string;
  paymentMetodeId: number;
  paymentMetodeName: PaymentType;
  note?: string;
  dateOfPayment: string;
  statusId: number;
  statusName: Status;
  status: Status;
};

export type UpdateExpenseType = CREATEEXPENSETYPE & { id: number };
