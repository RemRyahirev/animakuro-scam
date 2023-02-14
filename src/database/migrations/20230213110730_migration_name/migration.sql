-- CreateEnum
CREATE TYPE "FolderType" AS ENUM ('LOOKING', 'ABANDONED', 'PLANNED', 'VIEWED', 'DEFAULT');

-- AlterTable
ALTER TABLE "user_folder" ADD COLUMN     "type" "FolderType" NOT NULL DEFAULT 'DEFAULT';
