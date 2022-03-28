/*
  Warnings:

  - You are about to alter the column `value` on the `Options` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Options` MODIFY `value` INTEGER NOT NULL;
