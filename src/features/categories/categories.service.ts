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

    // create category
    const categoryData = {
      categoryName: data?.categoryName,
      description: data.description ?? null,
      icon: data.icon ?? null,
      color: data?.color ?? null,
      type: data?.categoryType,
    };
    const createNewCategory = await prisma.category?.create({
      data: {
        ...categoryData,
      },
    });
    console.log(createNewCategory);

    if (!createNewCategory) {
      throw new ApiError(500, "Create Category fail");
    }
    return createNewCategory;
  } catch (error) {
    throw new ApiError(500, "Category Creation Failed");
  }
};
