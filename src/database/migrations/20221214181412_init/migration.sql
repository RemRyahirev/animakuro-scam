-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('UNSPECIFIED', 'MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ThirdPartyType" AS ENUM ('DISCORD', 'GOOGLE', 'APPLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('AWAITING', 'REQUESTED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "FilmRating" AS ENUM ('G', 'PG', 'PG_13', 'R', 'R_17', 'NC_17', 'NC_21');

-- CreateEnum
CREATE TYPE "MediaSource" AS ENUM ('ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS');

-- CreateEnum
CREATE TYPE "MediaFormat" AS ENUM ('TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT', 'OTHER');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('MAIN_HERO', 'MAJOR_HERO', 'OTHER');

-- CreateEnum
CREATE TYPE "WatchStatus" AS ENUM ('WATCHING', 'PLANNED', 'SEEN', 'ABANDONED');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "password_hash" TEXT NOT NULL,
    "secret2fa" VARCHAR(20),
    "birthday" DATE,
    "gender" "Gender" NOT NULL DEFAULT 'UNSPECIFIED',
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "thirdPartyAuthId" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_auth_session" (
    "id" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "ip" VARCHAR(64) NOT NULL,
    "userId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "site_auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "third_party_auth" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "id" TEXT NOT NULL,
    "uid" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320),
    "firstName" VARCHAR(64),
    "lastName" VARCHAR(64),
    "avatar" TEXT,
    "type" "ThirdPartyType" NOT NULL,

    CONSTRAINT "third_party_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "genres" UUID[],
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
    "characters" UUID[],
    "authors" UUID[],

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
    "importance" "Importance" NOT NULL DEFAULT 'MAIN_HERO',
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

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_anime" (
    "id" UUID NOT NULL,
    "anime_id" VARCHAR(100) NOT NULL,
    "user_profile_id" UUID NOT NULL,
    "season" SMALLINT NOT NULL,
    "episode" SMALLINT NOT NULL,
    "status" "WatchStatus" NOT NULL DEFAULT 'WATCHING',
    "in_favourites" BOOLEAN NOT NULL,
    "episode_duration" INTEGER NOT NULL,
    "paused_timestamp" INTEGER NOT NULL,
    "watched_time" TIME NOT NULL,

    CONSTRAINT "user_anime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_friend_one_friend_two_key" ON "friendship"("friend_one", "friend_two");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_thirdPartyAuthId_fkey" FOREIGN KEY ("thirdPartyAuthId") REFERENCES "third_party_auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_auth_session" ADD CONSTRAINT "site_auth_session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_studio_id_fkey" FOREIGN KEY ("studio_id") REFERENCES "studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_anime" ADD CONSTRAINT "user_anime_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
