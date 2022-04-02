/*
  Warnings:

  - You are about to drop the column `optionsId` on the `Students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_optionsId_fkey`;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `optionsId`,
    ADD COLUMN `options_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_options_id_fkey` FOREIGN KEY (`options_id`) REFERENCES `Options`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
