/*
  Warnings:

  - The primary key for the `intituicoes_ensino` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `intituicoes_ensino` table. All the data in the column will be lost.
  - The primary key for the `laboratorios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `laboratorios` table. All the data in the column will be lost.
  - The primary key for the `manutencoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_laboratorio` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `manutencoes` table. All the data in the column will be lost.
  - You are about to drop the column `cod_instituicao` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `laboratorio_id` to the `manutencoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicao_id` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_cod_laboratorio_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_cod_instituicao_fkey";

-- AlterTable
ALTER TABLE "intituicoes_ensino" DROP CONSTRAINT "intituicoes_ensino_pkey",
DROP COLUMN "codigo",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "intituicoes_ensino_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "laboratorios" DROP CONSTRAINT "laboratorios_pkey",
DROP COLUMN "codigo",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "laboratorios_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_pkey",
DROP COLUMN "cod_laboratorio",
DROP COLUMN "codigo",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "laboratorio_id" INTEGER NOT NULL,
ADD CONSTRAINT "manutencoes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "cod_instituicao",
ADD COLUMN     "instituicao_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "imagens_manutencao" (
    "id" SERIAL NOT NULL,
    "manutencao_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "imagens_manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "imagens_manutencao_nome_manutencao_id_key" ON "imagens_manutencao"("nome", "manutencao_id");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "intituicoes_ensino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_laboratorio_id_fkey" FOREIGN KEY ("laboratorio_id") REFERENCES "laboratorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens_manutencao" ADD CONSTRAINT "imagens_manutencao_manutencao_id_fkey" FOREIGN KEY ("manutencao_id") REFERENCES "manutencoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
