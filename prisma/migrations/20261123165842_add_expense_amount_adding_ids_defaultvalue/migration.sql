/*
  Warnings:

  - Changed the type of `amount` on the `expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "paymentMetodeId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
