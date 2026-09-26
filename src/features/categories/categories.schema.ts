import * as yup from "yup";

export const categorySchema = yup.object({
  categoryName: yup.string().required("Category Name is Required"),
});
