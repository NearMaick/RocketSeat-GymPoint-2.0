/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Students` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Options` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Registrations` (
    `id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `option_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `finished_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `Options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
