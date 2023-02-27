-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "banner_id" UUID,
ADD COLUMN     "cover_id" UUID;

-- AlterTable
ALTER TABLE "author" ADD COLUMN     "cover_id" UUID;

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "banner_id" UUID,
ADD COLUMN     "cover_id" UUID;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
