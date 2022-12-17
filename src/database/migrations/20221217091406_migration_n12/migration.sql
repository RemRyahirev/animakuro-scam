/*
  Warnings:

  - The primary key for the `author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `character` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - Changed the type of `id` on the `author` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "author" DROP CONSTRAINT "author_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "character" DROP CONSTRAINT "character_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "character_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "password" TEXT NOT NULL;
