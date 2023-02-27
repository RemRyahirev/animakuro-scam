-- CreateEnum
CREATE TYPE "AnimeStillsType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "AnimeStillsPriorityType" AS ENUM ('TH1', 'TH2', 'TH3');

-- CreateTable
CREATE TABLE "anime_stills" (
    "id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "frame_id" UUID NOT NULL,
    "type" "AnimeStillsType" NOT NULL,
    "priority" "AnimeStillsPriorityType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anime_stills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anime_stills_frame_id_key" ON "anime_stills"("frame_id");

-- CreateIndex
CREATE UNIQUE INDEX "anime_stills_anime_id_priority_key" ON "anime_stills"("anime_id", "priority");

-- AddForeignKey
ALTER TABLE "anime_stills" ADD CONSTRAINT "anime_stills_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_stills" ADD CONSTRAINT "anime_stills_frame_id_fkey" FOREIGN KEY ("frame_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
