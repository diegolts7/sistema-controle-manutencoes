/*
  Warnings:

  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_externo` on the `usuarios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "laboratorios" DROP CONSTRAINT "laboratorios_responsavel_id_fkey";

-- DropForeignKey
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_tecnico_responsavel_id_fkey";

-- DropForeignKey
ALTER TABLE "manutencoes" DROP CONSTRAINT "manutencoes_usuario_solicitacao_id_fkey";

-- DropIndex
DROP INDEX "usuarios_id_externo_key";

-- AlterTable
ALTER TABLE "laboratorios" ALTER COLUMN "responsavel_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "manutencoes" ALTER COLUMN "usuario_solicitacao_id" SET DATA TYPE TEXT,
ALTER COLUMN "tecnico_responsavel_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
DROP COLUMN "id_externo",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuarios_id_seq";

-- AddForeignKey
ALTER TABLE "laboratorios" ADD CONSTRAINT "laboratorios_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_usuario_solicitacao_id_fkey" FOREIGN KEY ("usuario_solicitacao_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_tecnico_responsavel_id_fkey" FOREIGN KEY ("tecnico_responsavel_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
