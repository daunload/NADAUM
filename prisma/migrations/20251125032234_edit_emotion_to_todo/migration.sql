/*
  Warnings:

  - The `emotion` column on the `TodoTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TodoTask" DROP COLUMN "emotion",
ADD COLUMN     "emotion" TEXT[] DEFAULT ARRAY[]::TEXT[];
