import { PaymentType, Type, Status } from "../generated/prisma/client.ts";
import { ApiError } from "../utilities/customError.ts";

export const getAllPaymentTypeService = () => {

  const paymentMethodeType = Object.values(PaymentType).map((val, index) => {
    return {
      value: val,
      id: index + 1,
      label: val.replace(/([a-z])([A-Z])/g, "$1 $2"),
    };
  });

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

export const getAllStatusService = () => {
  const status = Object.values(Status).map((val, index) => {
    return {
      value: val,
      id: index + 1,
      label: val.replace(/([a-z])([A-Z])/g, "$1 $2"),
    };
  });

  if (!status) {
    throw new ApiError(500, "Failed to retrieve payment types");
  }

  return status;
};
