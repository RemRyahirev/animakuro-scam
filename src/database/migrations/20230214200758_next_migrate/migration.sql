/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_social` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToUser" DROP CONSTRAINT "_AnimeToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToUser" DROP CONSTRAINT "_AuthorToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToUser" DROP CONSTRAINT "_CharacterToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToUser" DROP CONSTRAINT "_GenreToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_StudioToUser" DROP CONSTRAINT "_StudioToUser_B_fkey";

-- AlterTable
ALTER TABLE "_AnimeToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_AuthorToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CharacterToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_GenreToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StudioToUser" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "is_social",
ADD COLUMN     "social_service" "AuthType" NOT NULL DEFAULT 'JWT',
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_StudioToUser" ADD CONSTRAINT "_StudioToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToUser" ADD CONSTRAINT "_AnimeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToUser" ADD CONSTRAINT "_CharacterToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
