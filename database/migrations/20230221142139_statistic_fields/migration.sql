-- CreateEnum
CREATE TYPE "StatisticName" AS ENUM ('FAVORITES', 'ANIME_USER_RATING', 'ANIME_FOLDER');

-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "statistics" JSONB;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "statistics" JSONB;

-- CreateTable
CREATE TABLE "statistic" (
    "name" "StatisticName" NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "statistic_pkey" PRIMARY KEY ("name")
);
