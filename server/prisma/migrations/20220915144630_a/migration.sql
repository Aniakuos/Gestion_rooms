/*
  Warnings:

  - Added the required column `type` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_id_user_1_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_id_user_2_fkey";

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "id_user_1" SET DATA TYPE TEXT,
ALTER COLUMN "id_user_2" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_id_user_1_fkey" FOREIGN KEY ("id_user_1") REFERENCES "User"("login") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_id_user_2_fkey" FOREIGN KEY ("id_user_2") REFERENCES "User"("login") ON DELETE CASCADE ON UPDATE CASCADE;
