-- AlterTable
ALTER TABLE "character" ADD COLUMN     "cover_id" UUID;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
