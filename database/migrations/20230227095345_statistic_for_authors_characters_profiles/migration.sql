-- AlterTable
ALTER TABLE "author" ADD COLUMN     "statistics" JSONB;

-- AlterTable
ALTER TABLE "character" ADD COLUMN     "statistics" JSONB;

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "statistics" JSONB;
