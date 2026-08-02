/*
  Warnings:

  - Made the column `cargo` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ativo` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "cargo" SET NOT NULL,
ALTER COLUMN "ativo" SET NOT NULL;
