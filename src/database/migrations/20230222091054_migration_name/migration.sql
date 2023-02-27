-- CreateEnum
CREATE TYPE "AnimeStillsType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "AnimeStillsPriorityType" AS ENUM ('TH1', 'TH2', 'TH3');

-- CreateEnum
CREATE TYPE "OpeningEndingType" AS ENUM ('OPENING', 'ENDING');

-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('AWAITING', 'REQUESTED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "AnimeRelation" AS ENUM ('DIRECT', 'CHRONOLOGY', 'FRANCHISE', 'NULL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('UNSPECIFIED', 'MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "AnimeApproval" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "FilmRating" AS ENUM ('G', 'PG', 'PG_13', 'R', 'R_17', 'NC_17', 'NC_21');

-- CreateEnum
CREATE TYPE "MediaSource" AS ENUM ('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('COMPLETED', 'ANNOUNCEMENT', 'RELEASING', 'AIRING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS');

-- CreateEnum
CREATE TYPE "MediaFormat" AS ENUM ('TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT', 'OTHER');

-- CreateEnum
CREATE TYPE "YearSeason" AS ENUM ('FALL', 'SUMMER', 'SPRING', 'WINTER');

-- CreateEnum
CREATE TYPE "AnimeType" AS ENUM ('ANIME', 'MANGA');

-- CreateEnum
CREATE TYPE "CharacterType" AS ENUM ('PROTAGONIST', 'ANTAGONIST', 'SIDEKICK', 'ORBITAL_CHARACTER', 'LOVE_INTEREST', 'CONFIDANTE', 'EXTRAS', 'FOIL', 'OTHER');

-- CreateEnum
CREATE TYPE "CharacterRole" AS ENUM ('MAIN', 'SUPPORTING', 'BACKGROUND');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('JWT', 'DISCORD', 'GOOGLE', 'APPLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "ModeratorRoles" AS ENUM ('ADMIN', 'MODERATOR', 'CONTENT_FILLER', 'OTHER_STAFF', 'VIEWER');

-- CreateEnum
CREATE TYPE "SubscribeTier" AS ENUM ('FREE_ACCOUNT', 'BASIC', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "ProfileLanguages" AS ENUM ('ENGLISH', 'RUSSIAN', 'JAPANESE', 'UKRAINIAN');

-- CreateEnum
CREATE TYPE "ProfileCountries" AS ENUM ('USA', 'RUSSIA', 'JAPAN', 'UKRAINE', 'UNSPECIFIED');

-- CreateEnum
CREATE TYPE "SiteTheme" AS ENUM ('LIGHT', 'DARK', 'AUTO');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "Media" AS ENUM ('ANIMES', 'STUDIOS', 'CHARACTERS', 'AUTHORS', 'GENRES');

-- CreateEnum
CREATE TYPE "FolderType" AS ENUM ('WATCHING', 'PLAN_TO_WATCH', 'COMPLETED', 'REWATCHING', 'PAUSED', 'DROPPED', 'DEFAULT');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "avatar" TEXT,
    "is_email_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "social_service" "AuthType" NOT NULL DEFAULT 'JWT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "type" "AuthType" NOT NULL,
    "uuid" VARCHAR(64) NOT NULL,
    "access_token" VARCHAR(320) NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "avatar" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "id" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "ip" VARCHAR(64) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" UUID NOT NULL,

    CONSTRAINT "auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,
    "rating" REAL NOT NULL,
    "thumbnail_id" UUID,
    "anime_count" REAL NOT NULL DEFAULT 0,
    "anime_starts" REAL NOT NULL,
    "anime_ends" REAL NOT NULL,
    "is_animation_studio" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendship" (
    "friend_one" UUID NOT NULL,
    "friend_two" UUID NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'AWAITING',
    "start_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "anime" (
    "id" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "score" REAL NOT NULL,
    "evaluation" JSONB NOT NULL DEFAULT '{ "5": 0 ,"4": 0 , "3": 0, "2": 0, "1": 0}',
    "year" SMALLINT NOT NULL,
    "date_start" DATE,
    "date_end" DATE,
    "country_of_origin" VARCHAR(2) NOT NULL,
    "format" "MediaFormat" NOT NULL DEFAULT 'OTHER',
    "source" "MediaSource" NOT NULL DEFAULT 'OTHER',
    "season" "YearSeason" NOT NULL DEFAULT 'FALL',
    "type" "AnimeType" NOT NULL DEFAULT 'ANIME',
    "hashtags" TEXT[],
    "synonyms" TEXT[],
    "is_licensed" BOOLEAN NOT NULL,
    "seasons_count" SMALLINT NOT NULL,
    "episodes" SMALLINT NOT NULL,
    "duration" INTEGER NOT NULL,
    "next_episode" TIMESTAMP(3) NOT NULL,
    "rating" "FilmRating" NOT NULL DEFAULT 'G',
    "description" TEXT NOT NULL,
    "preview_link" TEXT NOT NULL,
    "status_description" VARCHAR(30) NOT NULL,
    "release_status" "ReleaseStatus" NOT NULL DEFAULT 'COMPLETED',
    "banner_id" UUID,
    "cover_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relating_anime" (
    "child_anime_id" UUID NOT NULL,
    "parent_anime_id" UUID NOT NULL,
    "status" "AnimeRelation" NOT NULL DEFAULT 'NULL',

    CONSTRAINT "relating_anime_pkey" PRIMARY KEY ("child_anime_id","parent_anime_id")
);

-- CreateTable
CREATE TABLE "similar_anime" (
    "child_anime_id" UUID NOT NULL,
    "parent_anime_id" UUID NOT NULL,
    "status" "AnimeApproval" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "similar_anime_pkey" PRIMARY KEY ("child_anime_id","parent_anime_id")
);

-- CreateTable
CREATE TABLE "airing_schedule" (
    "id" UUID NOT NULL,
    "airing_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "episode" SMALLINT NOT NULL,
    "anime_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "airing_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "primary_occupations" TEXT[],
    "age" INTEGER NOT NULL,
    "date_of_birth" VARCHAR(30) NOT NULL,
    "date_of_death" VARCHAR(30) NOT NULL,
    "synonyms" TEXT[],
    "years_active" TEXT[],
    "home_town" VARCHAR(30) NOT NULL,
    "blood_type" VARCHAR(30) NOT NULL,
    "language" VARCHAR(30) NOT NULL,
    "gender" VARCHAR(30) NOT NULL,
    "bio" TEXT NOT NULL,
    "cover_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(30) NOT NULL,
    "blood_type" VARCHAR(30) NOT NULL,
    "date_of_birth" VARCHAR(30) NOT NULL,
    "age" INTEGER NOT NULL,
    "synonyms" TEXT[],
    "importance" "CharacterType" NOT NULL DEFAULT 'PROTAGONIST',
    "role" "CharacterRole" NOT NULL DEFAULT 'MAIN',
    "description" TEXT NOT NULL,
    "cover_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" UUID NOT NULL,
    "language" VARCHAR(20) NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "banner_id" UUID,
    "cover_id" UUID,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_settings" (
    "id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,
    "displayed_name" VARCHAR(30),
    "gender" "Gender" NOT NULL DEFAULT 'UNSPECIFIED',
    "birthday" DATE,
    "site_theme" "SiteTheme" NOT NULL DEFAULT 'AUTO',
    "avatar_id" UUID,
    "cover_id" UUID,
    "country" "ProfileCountries" NOT NULL DEFAULT 'UNSPECIFIED',
    "language" "ProfileLanguages" NOT NULL DEFAULT 'ENGLISH',
    "about" TEXT,
    "timezone" VARCHAR(7),
    "moderator_role" "ModeratorRoles" NOT NULL DEFAULT 'VIEWER',
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "profile_type" "ProfileType" NOT NULL DEFAULT 'PUBLIC',
    "integrations" JSON NOT NULL,
    "notifications" JSON NOT NULL,
    "subscribe_tier" "SubscribeTier" NOT NULL DEFAULT 'FREE_ACCOUNT',
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_folder" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_collection_id" UUID,
    "is_collection" BOOLEAN NOT NULL DEFAULT false,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_statistic_active" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(25) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "FolderType" NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_folder_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "rating_anime" (
    "user_id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "rating_anime_pkey" PRIMARY KEY ("anime_id","user_id")
);

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

-- CreateTable
CREATE TABLE "file" (
    "id" UUID NOT NULL,
    "file_id" VARCHAR(100) NOT NULL,
    "bucket_name" VARCHAR(100) NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudioToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToGenre" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToStudio" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToCharacter" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToAuthor" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToUserFolder" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_username_key" ON "auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_friend_one_friend_two_key" ON "friendship"("friend_one", "friend_two");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_settings_profile_id_key" ON "profile_settings"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_settings_avatar_id_key" ON "profile_settings"("avatar_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_settings_cover_id_key" ON "profile_settings"("cover_id");

-- CreateIndex
CREATE UNIQUE INDEX "anime_stills_frame_id_key" ON "anime_stills"("frame_id");

-- CreateIndex
CREATE UNIQUE INDEX "anime_stills_anime_id_priority_key" ON "anime_stills"("anime_id", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "_StudioToUser_AB_unique" ON "_StudioToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StudioToUser_B_index" ON "_StudioToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToGenre_AB_unique" ON "_AnimeToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToGenre_B_index" ON "_AnimeToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToStudio_AB_unique" ON "_AnimeToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToStudio_B_index" ON "_AnimeToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToCharacter_AB_unique" ON "_AnimeToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToCharacter_B_index" ON "_AnimeToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToAuthor_AB_unique" ON "_AnimeToAuthor"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToAuthor_B_index" ON "_AnimeToAuthor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToUserFolder_AB_unique" ON "_AnimeToUserFolder"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToUserFolder_B_index" ON "_AnimeToUserFolder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToUser_AB_unique" ON "_AnimeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToUser_B_index" ON "_AnimeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToUser_AB_unique" ON "_AuthorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToUser_B_index" ON "_AuthorToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToUser_AB_unique" ON "_CharacterToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToUser_B_index" ON "_CharacterToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToUser_AB_unique" ON "_GenreToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToUser_B_index" ON "_GenreToUser"("B");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studio" ADD CONSTRAINT "studio_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relating_anime" ADD CONSTRAINT "relating_anime_child_anime_id_fkey" FOREIGN KEY ("child_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relating_anime" ADD CONSTRAINT "relating_anime_parent_anime_id_fkey" FOREIGN KEY ("parent_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "similar_anime" ADD CONSTRAINT "similar_anime_child_anime_id_fkey" FOREIGN KEY ("child_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "similar_anime" ADD CONSTRAINT "similar_anime_parent_anime_id_fkey" FOREIGN KEY ("parent_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "airing_schedule" ADD CONSTRAINT "airing_schedule_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character" ADD CONSTRAINT "character_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_settings" ADD CONSTRAINT "profile_settings_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder" ADD CONSTRAINT "user_folder_user_collection_id_fkey" FOREIGN KEY ("user_collection_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_ending" ADD CONSTRAINT "opening_ending_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_anime" ADD CONSTRAINT "rating_anime_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_anime" ADD CONSTRAINT "rating_anime_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_stills" ADD CONSTRAINT "anime_stills_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_stills" ADD CONSTRAINT "anime_stills_frame_id_fkey" FOREIGN KEY ("frame_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudioToUser" ADD CONSTRAINT "_StudioToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudioToUser" ADD CONSTRAINT "_StudioToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAuthor" ADD CONSTRAINT "_AnimeToAuthor_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAuthor" ADD CONSTRAINT "_AnimeToAuthor_B_fkey" FOREIGN KEY ("B") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserFolder" ADD CONSTRAINT "_AnimeToUserFolder_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUserFolder" ADD CONSTRAINT "_AnimeToUserFolder_B_fkey" FOREIGN KEY ("B") REFERENCES "user_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUser" ADD CONSTRAINT "_AnimeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUser" ADD CONSTRAINT "_AnimeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToUser" ADD CONSTRAINT "_CharacterToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToUser" ADD CONSTRAINT "_CharacterToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
