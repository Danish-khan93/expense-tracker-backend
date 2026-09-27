-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Expense', 'Income');

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'Expense',
    "categoryName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");
