/*
  Warnings:

  - The `priority` column on the `anime_stills` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "anime_stills" ADD COLUMN     "url" VARCHAR(1000),
ALTER COLUMN "frame_id" DROP NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" INTEGER;

-- DropEnum
DROP TYPE "AnimeStillsPriorityType";

-- CreateIndex
CREATE UNIQUE INDEX "anime_stills_anime_id_priority_key" ON "anime_stills"("anime_id", "priority");
