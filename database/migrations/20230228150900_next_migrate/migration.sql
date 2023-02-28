-- CreateTable
CREATE TABLE "anime_history" (
    "id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "spent_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anime_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_history" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "spent_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "author_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_history" (
    "id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "spent_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "character_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "anime_history" ADD CONSTRAINT "anime_history_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_history" ADD CONSTRAINT "anime_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_history" ADD CONSTRAINT "author_history_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_history" ADD CONSTRAINT "author_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_history" ADD CONSTRAINT "character_history_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_history" ADD CONSTRAINT "character_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
