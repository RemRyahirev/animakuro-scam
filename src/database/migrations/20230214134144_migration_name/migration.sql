-- CreateTable
CREATE TABLE "reyting_anime" (
    "user_id" UUID NOT NULL,
    "anime_id" UUID NOT NULL,
    "reyting" INTEGER NOT NULL,

    CONSTRAINT "reyting_anime_pkey" PRIMARY KEY ("anime_id","user_id")
);

-- AddForeignKey
ALTER TABLE "reyting_anime" ADD CONSTRAINT "reyting_anime_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reyting_anime" ADD CONSTRAINT "reyting_anime_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
