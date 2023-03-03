/*
  Warnings:

  - You are about to drop the column `user_id` on the `anime_history` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `author_history` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `character_history` table. All the data in the column will be lost.
  - Added the required column `user_profile_id` to the `anime_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `author_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `character_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "StatisticName" ADD VALUE 'COLLECTION_USER_RATING';

-- DropForeignKey
ALTER TABLE "anime_history" DROP CONSTRAINT "anime_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "author_history" DROP CONSTRAINT "author_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "character_history" DROP CONSTRAINT "character_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_folder" DROP CONSTRAINT "user_folder_user_collection_id_fkey";

-- AlterTable
ALTER TABLE "anime" ALTER COLUMN "evaluation" SET DEFAULT '{ "five": 0 ,"four": 0 , "three": 0, "two": 0, "one": 0}';

-- AlterTable
-- ALTER TABLE "anime_history" DROP COLUMN "user_id",
-- ADD COLUMN     "user_profile_id" UUID NOT NULL;
ALTER TABLE "anime_history" ADD COLUMN "user_profile_id" UUID;
UPDATE "anime_history" ah
   SET user_profile_id = s.id
  FROM (
          SELECT u.id as user_id,
                 up.id
            FROM "users" u
            JOIN "user_profile" up
              ON up.user_id = u.id
       ) s
 WHERE s.user_id = ah.user_id;
ALTER TABLE "anime_history" ALTER COLUMN "user_profile_id" SET NOT NULL;
ALTER TABLE "anime_history" DROP COLUMN "user_id";

-- AlterTable
-- ALTER TABLE "author_history" DROP COLUMN "user_id",
-- ADD COLUMN     "user_profile_id" UUID NOT NULL;
ALTER TABLE "author_history" ADD COLUMN "user_profile_id" UUID;
UPDATE "author_history" ah
   SET user_profile_id = s.id
  FROM (
         SELECT u.id as user_id,
                up.id
           FROM "users" u
           JOIN "user_profile" up
             ON up.user_id = u.id
       ) s
 WHERE s.user_id = ah.user_id;
ALTER TABLE "author_history" ALTER COLUMN "user_profile_id" SET NOT NULL;
ALTER TABLE "author_history" DROP COLUMN "user_id";

-- AlterTable
-- ALTER TABLE "character_history" DROP COLUMN "user_id",
-- ADD COLUMN     "user_profile_id" UUID NOT NULL;
ALTER TABLE "character_history" ADD COLUMN "user_profile_id" UUID;
UPDATE "character_history" ah
   SET user_profile_id = s.id
  FROM (
         SELECT u.id as user_id,
                up.id
         FROM "users" u
                  JOIN "user_profile" up
                       ON up.user_id = u.id
       ) s
 WHERE s.user_id = ah.user_id;
ALTER TABLE "character_history" ALTER COLUMN "user_profile_id" SET NOT NULL;
ALTER TABLE "character_history" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user_folder" ADD COLUMN     "hashtags" TEXT[],
ADD COLUMN     "is_spoiler" BOOLEAN DEFAULT false,
ADD COLUMN     "statistics" JSONB,
ADD COLUMN     "thumbnail_id" UUID,
ADD COLUMN     "user_favourite_collections_id" UUID;

-- CreateTable
CREATE TABLE "authors_roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_user_collection" (
    "user_profile_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "rating_user_collection_pkey" PRIMARY KEY ("user_profile_id","collection_id")
);

-- CreateTable
CREATE TABLE "_AuthorToAuthorsRoles" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToAuthorsRoles_AB_unique" ON "_AuthorToAuthorsRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToAuthorsRoles_B_index" ON "_AuthorToAuthorsRoles"("B");

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_collection_id_fkey" FOREIGN KEY ("user_collection_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_favourite_collections_id_fkey" FOREIGN KEY ("user_favourite_collections_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_user_collection" ADD CONSTRAINT "rating_user_collection_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_user_collection" ADD CONSTRAINT "rating_user_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "user_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_history" ADD CONSTRAINT "anime_history_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_history" ADD CONSTRAINT "author_history_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_history" ADD CONSTRAINT "character_history_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToAuthorsRoles" ADD CONSTRAINT "_AuthorToAuthorsRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToAuthorsRoles" ADD CONSTRAINT "_AuthorToAuthorsRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "authors_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
