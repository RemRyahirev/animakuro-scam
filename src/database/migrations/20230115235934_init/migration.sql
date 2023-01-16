-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('AWAITING', 'REQUESTED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "AnimeRelation" AS ENUM ('DIRECT', 'CHRONOLOGY', 'FRANCHISE', 'NULL');

-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('WATCHING', 'PLANNED', 'COMPLETED', 'DROPPED');

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

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "is_email_confired" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "birthday" DATE,
    "gender" "Gender" NOT NULL DEFAULT 'UNSPECIFIED',
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

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
    "user_id" UUID,

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
    "thumbnail" TEXT NOT NULL,
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
    "next_episode" TIME NOT NULL,
    "rating" "FilmRating" NOT NULL DEFAULT 'G',
    "description" TEXT NOT NULL,
    "preview_link" TEXT NOT NULL,
    "status_description" VARCHAR(30) NOT NULL,
    "release_status" "ReleaseStatus" NOT NULL DEFAULT 'COMPLETED',
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
    "bucket_id" UUID NOT NULL,
    "bio" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" UUID NOT NULL,
    "bucket_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(30) NOT NULL,
    "blood_type" VARCHAR(30) NOT NULL,
    "date_of_birth" VARCHAR(30) NOT NULL,
    "age" TEXT NOT NULL,
    "synonyms" TEXT[],
    "importance" "CharacterType" NOT NULL DEFAULT 'PROTAGONIST',
    "role" "CharacterRole" NOT NULL DEFAULT 'MAIN',
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

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
    "displayed_name" VARCHAR(30),
    "profile_picture_id" UUID,
    "banner_image" UUID,
    "about" TEXT,
    "country" "ProfileCountries" NOT NULL DEFAULT 'UNSPECIFIED',
    "language" "ProfileLanguages" NOT NULL DEFAULT 'ENGLISH',
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "subscribe_tier" "SubscribeTier" NOT NULL DEFAULT 'FREE_ACCOUNT',
    "moderator_role" "ModeratorRoles" NOT NULL DEFAULT 'VIEWER',
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_anime" (
    "id" UUID NOT NULL,
    "user_profile_id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'WATCHING',
    "in_favourites" BOOLEAN NOT NULL DEFAULT false,
    "season" SMALLINT,
    "episode" SMALLINT,
    "episode_duration" INTEGER,
    "watched_duration" INTEGER,

    CONSTRAINT "user_anime_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_username_key" ON "auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_friend_one_friend_two_key" ON "friendship"("friend_one", "friend_two");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_anime_user_profile_id_key" ON "user_anime"("user_profile_id");

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

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relating_anime" ADD CONSTRAINT "relating_anime_child_anime_id_fkey" FOREIGN KEY ("child_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relating_anime" ADD CONSTRAINT "relating_anime_parent_anime_id_fkey" FOREIGN KEY ("parent_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "similar_anime" ADD CONSTRAINT "similar_anime_child_anime_id_fkey" FOREIGN KEY ("child_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "similar_anime" ADD CONSTRAINT "similar_anime_parent_anime_id_fkey" FOREIGN KEY ("parent_anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime" ADD CONSTRAINT "user_anime_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime" ADD CONSTRAINT "user_anime_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
