/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ref` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productBrand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productReference` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "identifier",
DROP COLUMN "img",
DROP COLUMN "name",
DROP COLUMN "owner",
DROP COLUMN "ref",
ADD COLUMN     "productBrand" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "productReference" TEXT NOT NULL;
