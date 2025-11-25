-- AlterTable
ALTER TABLE "TodoTask" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availableTags" TEXT[] DEFAULT ARRAY[]::TEXT[];
