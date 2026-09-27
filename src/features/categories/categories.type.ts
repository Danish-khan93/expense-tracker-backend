export type CategoryCreate = {
  categoryName: string;
  categoryType: "Expense" | "Income";
  categoryTypeId: number;
  icon?: string;
  color?: string;
  description?: string;
};
