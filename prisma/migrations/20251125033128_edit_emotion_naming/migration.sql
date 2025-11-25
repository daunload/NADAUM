/*
  Warnings:

  - You are about to drop the column `emotion` on the `TodoTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoTask" DROP COLUMN "emotion",
ADD COLUMN     "emotions" TEXT[] DEFAULT ARRAY[]::TEXT[];
