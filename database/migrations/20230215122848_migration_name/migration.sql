/*
  Warnings:

  - The `evaluation` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "evaluation",
ADD COLUMN     "evaluation" JSONB NOT NULL DEFAULT '{ "5": 0 ,"4": 0 , "3": 0, "2": 0, "1": 0}';
