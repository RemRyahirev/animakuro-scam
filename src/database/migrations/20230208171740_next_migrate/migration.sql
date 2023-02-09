/*
  Warnings:

  - You are about to drop the `IpList` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OpeningEndingType" AS ENUM ('OPENING', 'ENDING');

-- DropTable
DROP TABLE "IpList";

-- CreateTable
CREATE TABLE "opening_ending" (
    "id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "type" "OpeningEndingType" NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "author_name" VARCHAR(100) NOT NULL,
    "episode_start" SMALLINT NOT NULL,
    "episode_end" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opening_ending_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "opening_ending" ADD CONSTRAINT "opening_ending_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
