/*
  Warnings:

  - The values [LOOKING,ABANDONED,PLANNED,VIEWED] on the enum `FolderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FolderType_new" AS ENUM ('WATCHING', 'PLAN_TO_WATCH', 'COMPLETED', 'REWATCHING', 'PAUSED', 'DROPPED', 'DEFAULT');
ALTER TABLE "user_folder" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "user_folder" ALTER COLUMN "type" TYPE "FolderType_new" USING ("type"::text::"FolderType_new");
ALTER TYPE "FolderType" RENAME TO "FolderType_old";
ALTER TYPE "FolderType_new" RENAME TO "FolderType";
DROP TYPE "FolderType_old";
ALTER TABLE "user_folder" ALTER COLUMN "type" SET DEFAULT 'DEFAULT';
COMMIT;
