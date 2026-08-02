-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_instituicao_id_fkey";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "instituicao_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "intituicoes_ensino"("id") ON DELETE SET NULL ON UPDATE CASCADE;
