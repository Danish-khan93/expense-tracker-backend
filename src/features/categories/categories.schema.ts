import * as yup from "yup";

export const categorySchema = yup.object({
  categoryName: yup
    .string()
    .trim()
    .min(1)
    .required("Category Name is Required"),
  categoryType: yup.string().required("Category Type Required"),
  categoryTypeId: yup.number().required("Category Type Id required"),
});
export const categoryUpdateSchema = yup.object({
  categoryName: yup.string().trim().min(1).optional(),
  categoryType: yup.string().optional(),
  categoryTypeId: yup.number().optional(),
});
