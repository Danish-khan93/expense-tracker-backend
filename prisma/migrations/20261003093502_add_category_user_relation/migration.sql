/*
  Warnings:

  - A unique constraint covering the columns `[userId,categoryName]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('cash', 'card', 'online');

-- DropIndex
DROP INDEX "category_categoryName_key";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "note" TEXT,
    "dateOfPayment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_userId_categoryName_key" ON "category"("userId", "categoryName");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
