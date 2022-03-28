/*
  Warnings:

  - You are about to drop the column `option_id` on the `Students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_option_id_fkey`;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `option_id`,
    ADD COLUMN `optionsId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_optionsId_fkey` FOREIGN KEY (`optionsId`) REFERENCES `Options`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
