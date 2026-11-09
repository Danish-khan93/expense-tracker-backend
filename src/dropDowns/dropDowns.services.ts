import { PaymentType,Type } from "../generated/prisma/client.ts";
import { ApiError } from "../utilities/customError.ts";

export const getAllPaymentTypeService = () => {
  console.log(PaymentType, "PaymentType");
  const paymentMethodeType = Object.values(PaymentType).map((val, index) => {
    console.log(val, "val");
    return {
      value: val,
      id: index + 1,
      label: val.replace(/([a-z])([A-Z])/g, "$1 $2"),
    };
  });
  console.log(paymentMethodeType, "paymentMethodeType");

  if (!paymentMethodeType) {
    throw new ApiError(500, "Failed to retrieve payment types");
  }

  return paymentMethodeType;
};



export const getAllCategoryTypeService = () => {
  const categoryType = Object.values(Type).map((val, index) => {
    return {
      value: val,
      id: index + 1,
      label: val.replace(/([a-z])([A-Z])/g, "$1 $2"),
    };
  });
  
  if (!categoryType) {
    throw new ApiError(500, "Failed to retrieve payment types");
  }

  return categoryType;
};



