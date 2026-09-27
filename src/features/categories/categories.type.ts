export type CategoryCreate = {
  categoryName: string;
  categoryType: "Expense" | "Income";
  categoryTypeId: number;
  icon?: string;
  color?: string;
  description?: string;
};


export type CategoryUpdate = {
       id: number,
        type: "Expense" | "Income",
        categoryName:string,
        icon: string,
        color: string,
        description: string,
        createdAt: string,
        updatedAt: string
}