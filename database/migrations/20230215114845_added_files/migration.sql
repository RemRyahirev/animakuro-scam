/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `studio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studio" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail_id" UUID;

-- CreateTable
CREATE TABLE "file" (
    "id" UUID NOT NULL,
    "file_id" VARCHAR(100) NOT NULL,
    "bucket_name" VARCHAR(100) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studio" ADD CONSTRAINT "studio_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
