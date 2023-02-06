-- DropForeignKey
ALTER TABLE "user_folder" DROP CONSTRAINT "user_folder_user_id_fkey";

-- AlterTable
ALTER TABLE "user_folder" ADD COLUMN     "user_collection_id" UUID;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_collection_id_fkey" FOREIGN KEY ("user_collection_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
