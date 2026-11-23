-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Paid', 'Pending', 'Rejected');

-- AlterTable
ALTER TABLE "expense" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';
