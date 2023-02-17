/*
  Warnings:

  - You are about to drop the column `is_social` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_social",
ADD COLUMN     "social_service" "AuthType" NOT NULL DEFAULT 'JWT';
