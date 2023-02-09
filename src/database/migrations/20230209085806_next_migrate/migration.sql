/*
  Warnings:

  - You are about to drop the `IpList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `opening_ending` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "opening_ending" DROP CONSTRAINT "opening_ending_anime_id_fkey";

-- DropTable
DROP TABLE "IpList";

-- DropTable
DROP TABLE "opening_ending";

-- DropEnum
DROP TYPE "OpeningEndingType";
