import { prisma } from "../../db.ts";
import { ApiError } from "../../utilities/customError.ts";
import type { CategoryCreate } from "./categories.type.ts";

export const categoryCreateSerive = async (data: CategoryCreate) => {
  try {
    // check the cateogry already or not
    const checkCategory = await prisma.category.findUnique({
      where: {
        categoryName: data?.categoryName,
      },
    });

    if (checkCategory) {
      throw new ApiError(
        409,
        `Category is ${data?.categoryName} ALready Created`,
      );
    }

// 


  } catch (error) {}
};
