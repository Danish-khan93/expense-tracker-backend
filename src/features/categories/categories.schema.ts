import * as yup from "yup";

export const categorySchema = yup.object({
  categoryName: yup.string().required("Category Name is Required"),
  categoryType: yup.string().required("Category Type Required"),
  categoryTypeId: yup.number().required("Category Type Id required"),
});
