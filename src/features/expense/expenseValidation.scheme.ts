import * as yup from "yup";

export const expenseValidationSchema = yup.object({
  amount: yup.string().required("Amount is required"),
  title: yup.string().required("Title is required"),
  expenseCategoryId: yup.number().required("Expense category is required"),
  expenseCategoryName: yup
    .string()
    .required("Expense category name is required"),
  date: yup.string().required("Date is required"),
  paymentMetodeName: yup.string().required("Payment method is required"),
  paymentMetodeId: yup.number().required("Payment method id is required"),
  
});
