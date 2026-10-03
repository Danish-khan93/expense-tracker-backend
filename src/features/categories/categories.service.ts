import { prisma } from "../../db.ts";
import { ApiError } from "../../utilities/customError.ts";
import type { CategoryCreate, CategoryUpdate } from "./categories.type.ts";

export const categoryCreateSerive = async (data: CategoryCreate) => {
  console.log(data);

  // check the cateogry already or not
  const checkCategory = await prisma.category.findUnique({
    where: {
      userId_categoryName: {
        userId: data?.userId,
        categoryName: data?.categoryName,
      },
    },
  });
  console.log(checkCategory);

  if (checkCategory) {
    throw new ApiError(
      409,
      `Category is ${data?.categoryName} Already Created`,
    );
  }

  // create category
  const categoryData = {
    categoryName: data?.categoryName,
    description: data.description ?? null,
    icon: data.icon ?? null,
    color: data?.color ?? null,
    type: data?.categoryType,
    userId: data?.userId,
  };
  console.log(categoryData, "categoryData");

  const createNewCategory = await prisma.category?.create({
    data: {
      ...categoryData,
    },
  });
  console.log(createNewCategory, "createNewCategorycreateNewCategory");

  if (!createNewCategory) {
    throw new ApiError(500, "Create Category fail");
  }
  return createNewCategory;
};

export const categoryUpdatedSerivce = async (
  id: number,
  data: CategoryUpdate,
) => {
  //find data with qurey id
  const findTheCategory = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  if (!findTheCategory) {
    throw new ApiError(404, "category not find");
  }

  const newUpdatedCategoryData = await prisma.category.update({
    where: { id: id },
    data: data,
  });
  console.log(newUpdatedCategoryData, "service");
  return newUpdatedCategoryData;
};

export const getCategoryByIdService = async (id: number) => {
  const findCategoryById = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  console.log(findCategoryById, "findCategoryById");
  if (!findCategoryById) {
    throw new ApiError(404, "The cateogry not found");
  }

  return findCategoryById;
};

// get by category type service

export const getCategoryByTypeSerivce = async (type: "Expense" | "Income") => {
  const findCategoryByType = await prisma.category.findMany({
    where: {
      type,
    },
  });
  return findCategoryByType;
};
