/*
  Warnings:

  - The primary key for the `rating_anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `rating_anime` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_folder` table. All the data in the column will be lost.
  - You are about to drop the column `statistics` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_AnimeToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AuthorToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharacterToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudioToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile_settings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_profile_id` to the `rating_anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `user_folder` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "_AnimeToUser" DROP CONSTRAINT "_AnimeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToUser" DROP CONSTRAINT "_AnimeToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToUser" DROP CONSTRAINT "_AuthorToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToUser" DROP CONSTRAINT "_AuthorToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToUser" DROP CONSTRAINT "_CharacterToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToUser" DROP CONSTRAINT "_CharacterToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToUser" DROP CONSTRAINT "_GenreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToUser" DROP CONSTRAINT "_GenreToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudioToUser" DROP CONSTRAINT "_StudioToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudioToUser" DROP CONSTRAINT "_StudioToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "profile_settings" DROP CONSTRAINT "profile_settings_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "rating_anime" DROP CONSTRAINT "rating_anime_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_folder" DROP CONSTRAINT "user_folder_user_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "user_folder" DROP CONSTRAINT "user_folder_user_id_fkey";

------------------ Create new entities

-- CreateTable
CREATE TABLE "_StudioToUserProfile" (
                                        "A" UUID NOT NULL,
                                        "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToUserProfile" (
                                       "A" UUID NOT NULL,
                                       "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToUserProfile" (
                                        "A" UUID NOT NULL,
                                        "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToUserProfile" (
                                           "A" UUID NOT NULL,
                                           "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToUserProfile" (
                                       "A" UUID NOT NULL,
                                       "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StudioToUserProfile_AB_unique" ON "_StudioToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_StudioToUserProfile_B_index" ON "_StudioToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToUserProfile_AB_unique" ON "_AnimeToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToUserProfile_B_index" ON "_AnimeToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToUserProfile_AB_unique" ON "_AuthorToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToUserProfile_B_index" ON "_AuthorToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToUserProfile_AB_unique" ON "_CharacterToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToUserProfile_B_index" ON "_CharacterToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToUserProfile_AB_unique" ON "_GenreToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToUserProfile_B_index" ON "_GenreToUserProfile"("B");

-- AddForeignKey
ALTER TABLE "_StudioToUserProfile" ADD CONSTRAINT "_StudioToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudioToUserProfile" ADD CONSTRAINT "_StudioToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserProfile" ADD CONSTRAINT "_AnimeToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserProfile" ADD CONSTRAINT "_AnimeToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUserProfile" ADD CONSTRAINT "_AuthorToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUserProfile" ADD CONSTRAINT "_AuthorToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToUserProfile" ADD CONSTRAINT "_CharacterToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToUserProfile" ADD CONSTRAINT "_CharacterToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUserProfile" ADD CONSTRAINT "_GenreToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUserProfile" ADD CONSTRAINT "_GenreToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "rating_anime"
    ADD COLUMN     "user_profile_id" UUID;

-- AlterTable
ALTER TABLE "user_folder"
    ADD COLUMN "user_profile_id" UUID;

-- AlterTable
ALTER TABLE "user_profile"
    ADD COLUMN "about"          TEXT,
    ADD COLUMN "avatar_id"      UUID,
    ADD COLUMN "birthday"       DATE,
    ADD COLUMN "country"        "ProfileCountries" NOT NULL DEFAULT 'UNSPECIFIED',
    ADD COLUMN "displayed_name" VARCHAR(30),
    ADD COLUMN "gender"         "Gender"           NOT NULL DEFAULT 'UNSPECIFIED',
    ADD COLUMN "integrations"   JSON,
    ADD COLUMN "is_blocked"     BOOLEAN            NOT NULL DEFAULT false,
    ADD COLUMN "language"       "ProfileLanguages" NOT NULL DEFAULT 'ENGLISH',
    ADD COLUMN "moderator_role" "ModeratorRoles"   NOT NULL DEFAULT 'VIEWER',
    ADD COLUMN "profile_type"   "ProfileType"      NOT NULL DEFAULT 'PUBLIC',
    ADD COLUMN "site_theme"     "SiteTheme"        NOT NULL DEFAULT 'AUTO',
    ADD COLUMN "timezone"       VARCHAR(7),
    ADD COLUMN "updated_at"     TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users"
    ADD COLUMN "notifications"  JSON,
    ADD COLUMN "subscribe_tier" "SubscribeTier" NOT NULL DEFAULT 'FREE_ACCOUNT';

--------- data migration

UPDATE "user_profile" up
   SET statistics = up.statistics::jsonb || u.statistics::jsonb
  FROM "users" u WHERE u.id = up.user_id;

UPDATE "user_profile" up
   SET about = ps.about,
       birthday = ps.birthday,
       country = ps.country,
       displayed_name = ps.displayed_name,
       gender = ps.gender,
       integrations = ps.integrations,
       is_blocked = ps.is_blocked,
       language = ps.language,
       moderator_role = ps.moderator_role,
       profile_type = ps.profile_type,
       site_theme = ps.site_theme,
       timezone = ps.timezone,
       updated_at = ps.updated_at
  FROM "profile_settings" ps WHERE ps.profile_id = up.id;

UPDATE "users" u
   SET notifications = s.notifications,
       subscribe_tier = s.subscribe_tier
  FROM (
        SELECT up.user_id,
               ps.notifications,
               ps.subscribe_tier
          FROM "profile_settings" ps
          JOIN "user_profile" up
            ON up.id = ps.profile_id
       ) s
 WHERE s.user_id = u.id;

UPDATE "rating_anime" ra
   SET user_profile_id = s.id
  FROM (
        SELECT u.id as user_id,
               up.id
          FROM "users" u
          JOIN "user_profile" up
            ON up.user_id = u.id
       ) s
 WHERE s.user_id = ra.user_id;

UPDATE "user_folder" uf
   SET user_profile_id = s.id
  FROM (
        SELECT u.id as user_id,
               up.id
          FROM "users" u
          JOIN "user_profile" up
            ON up.user_id = u.id
       ) s
 WHERE s.user_id = uf.user_id;

UPDATE "user_folder" uf
   SET user_collection_id = s.id
  FROM (
        SELECT u.id as user_id,
               up.id
          FROM "users" u
          JOIN "user_profile" up
            ON up.user_id = u.id
       ) s
 WHERE s.user_id = uf.user_collection_id;

INSERT INTO "_StudioToUserProfile" ("A", "B")
  SELECT * FROM (
        SELECT stu."A",
               up.id as "B"
          FROM "_StudioToUser" as stu
          JOIN "user_profile" as up
            ON up.user_id = stu."B"
      ) s;

INSERT INTO "_AnimeToUserProfile" ("A", "B")
  SELECT * FROM (
        SELECT atu."A",
               up.id as "B"
          FROM "_AnimeToUser" as atu
          JOIN "user_profile" as up
            ON up.user_id = atu."B"
      ) s;

INSERT INTO "_AuthorToUserProfile" ("A", "B")
  SELECT * FROM (
        SELECT atu."A",
               up.id as "B"
          FROM "_AuthorToUser" as atu
          JOIN "user_profile" as up
            ON up.user_id = atu."B"
      ) s;

INSERT INTO "_CharacterToUserProfile" ("A", "B")
  SELECT * FROM (
        SELECT ctu."A",
               up.id as "B"
          FROM "_CharacterToUser" as ctu
          JOIN "user_profile" as up
            ON up.user_id = ctu."B"
      ) s;

INSERT INTO "_GenreToUserProfile" ("A", "B")
  SELECT * FROM (
        SELECT gtu."A",
               up.id as "B"
          FROM "_GenreToUser" as gtu
          JOIN "user_profile" as up
            ON up.user_id = gtu."B"
      ) s;

-- add constraints after data migration
ALTER TABLE "rating_anime"
    ALTER COLUMN "user_profile_id" SET NOT NULL,
    DROP CONSTRAINT "rating_anime_pkey",
    DROP COLUMN "user_id",
    ADD CONSTRAINT "rating_anime_pkey" PRIMARY KEY ("anime_id", "user_profile_id");
ALTER TABLE "user_folder"
    ALTER COLUMN "user_profile_id" SET NOT NULL;


-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_collection_id_fkey" FOREIGN KEY ("user_collection_id") REFERENCES "user_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_anime" ADD CONSTRAINT "rating_anime_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

----------------- Remove entities

-- AlterTable
ALTER TABLE "user_folder"
    DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users"
    DROP COLUMN "statistics";

-- DropTable
DROP TABLE "_AnimeToUser";

-- DropTable
DROP TABLE "_AuthorToUser";

-- DropTable
DROP TABLE "_CharacterToUser";

-- DropTable
DROP TABLE "_GenreToUser";

-- DropTable
DROP TABLE "_StudioToUser";

-- DropTable
DROP TABLE "profile_settings";
