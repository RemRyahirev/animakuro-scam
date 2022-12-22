-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('AWAITING', 'REQUESTED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('WATCHING', 'PLANNED', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('UNSPECIFIED', 'MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "FilmRating" AS ENUM ('G', 'PG', 'PG_13', 'R', 'R_17', 'NC_17', 'NC_21');

-- CreateEnum
CREATE TYPE "MediaSource" AS ENUM ('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS');

-- CreateEnum
CREATE TYPE "MediaFormat" AS ENUM ('TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT', 'OTHER');

-- CreateEnum
CREATE TYPE "CharacterType" AS ENUM ('PROTAGONIST', 'ANTAGONIST', 'SIDEKICK', 'ORBITAL_CHARACTER', 'LOVE_INTEREST', 'CONFIDANTE', 'EXTRAS', 'FOIL', 'OTHER');

-- CreateEnum
CREATE TYPE "CharacterRole" AS ENUM ('MAIN', 'SUPPORTING', 'BACKGROUND');

-- CreateEnum
CREATE TYPE "ThirdPartyType" AS ENUM ('DISCORD', 'GOOGLE', 'APPLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('CONFIRM_EMAIL', 'ACTIVE');

-- CreateEnum
CREATE TYPE "ModeratorRoles" AS ENUM ('ADMIN', 'MODERATOR', 'CONTENT_FILLER', 'OTHER_STAFF', 'VIEWER');

-- CreateEnum
CREATE TYPE "SubscribeTier" AS ENUM ('FREE_ACCOUNT', 'BASIC', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "registration_status" "RegistrationStatus" NOT NULL DEFAULT 'CONFIRM_EMAIL',
    "password" TEXT NOT NULL,
    "secret2fa" VARCHAR(20),
    "birthday" DATE,
    "gender" "Gender" NOT NULL DEFAULT 'UNSPECIFIED',
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "third_party_auth_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_auth_session" (
    "id" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "ip" VARCHAR(64) NOT NULL,
    "user_id" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "site_auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "third_party_auth" (
    "id" TEXT NOT NULL,
    "uid" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "first_name" VARCHAR(64),
    "last_name" VARCHAR(64),
    "avatar" TEXT,
    "type" "ThirdPartyType" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "third_party_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studio_name" VARCHAR(64) NOT NULL,
    "rating" REAL NOT NULL,
    "thumbnail" TEXT NOT NULL,

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
    "media_format" "MediaFormat" NOT NULL DEFAULT 'OTHER',
    "source" "MediaSource" NOT NULL DEFAULT 'OTHER',
    "studio_id" UUID NOT NULL,
    "seasons_count" SMALLINT NOT NULL,
    "episodes_count" SMALLINT NOT NULL,
    "duration" INTEGER NOT NULL,
    "next_episode" TIME NOT NULL,
    "rating" "FilmRating" NOT NULL DEFAULT 'G',
    "description" TEXT NOT NULL,
    "preview_link" TEXT NOT NULL,
    "status_description" VARCHAR(30) NOT NULL,
    "release_status" "ReleaseStatus" NOT NULL DEFAULT 'FINISHED',

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" UUID NOT NULL,
    "author_name" VARCHAR(50) NOT NULL,
    "bucket_id" UUID NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" UUID NOT NULL,
    "bucket_id" UUID NOT NULL,
    "character_name" VARCHAR(50) NOT NULL,
    "importance" "CharacterType" NOT NULL DEFAULT 'PROTAGONIST',
    "role" "CharacterRole" NOT NULL DEFAULT 'MAIN',
    "description" TEXT NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" UUID NOT NULL,
    "genre_name" VARCHAR(50) NOT NULL,

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
    "displayed_name" VARCHAR(30) NOT NULL,
    "profile_picture_id" UUID NOT NULL,
    "banner_image" UUID NOT NULL,
    "about" TEXT NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "language" VARCHAR(30) NOT NULL,
    "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
    "subscribe_tier" "SubscribeTier" NOT NULL DEFAULT 'FREE_ACCOUNT',
    "moderator_role" "ModeratorRoles" NOT NULL DEFAULT 'VIEWER',
    "isBlocked" BOOLEAN NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_anime" (
    "id" UUID NOT NULL,
    "user_profile_id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'WATCHING',
    "in_favourites" BOOLEAN NOT NULL,
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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

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
CREATE UNIQUE INDEX "_AnimeToCharacter_AB_unique" ON "_AnimeToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToCharacter_B_index" ON "_AnimeToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToAuthor_AB_unique" ON "_AnimeToAuthor"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToAuthor_B_index" ON "_AnimeToAuthor"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_third_party_auth_id_fkey" FOREIGN KEY ("third_party_auth_id") REFERENCES "third_party_auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_auth_session" ADD CONSTRAINT "site_auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime" ADD CONSTRAINT "user_anime_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime" ADD CONSTRAINT "user_anime_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAuthor" ADD CONSTRAINT "_AnimeToAuthor_A_fkey" FOREIGN KEY ("A") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToAuthor" ADD CONSTRAINT "_AnimeToAuthor_B_fkey" FOREIGN KEY ("B") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
