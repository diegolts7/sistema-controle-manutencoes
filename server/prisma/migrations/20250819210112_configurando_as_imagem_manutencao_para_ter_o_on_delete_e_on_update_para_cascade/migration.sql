-- DropForeignKey
ALTER TABLE "imagens_manutencao" DROP CONSTRAINT "imagens_manutencao_manutencao_id_fkey";

-- AddForeignKey
ALTER TABLE "imagens_manutencao" ADD CONSTRAINT "imagens_manutencao_manutencao_id_fkey" FOREIGN KEY ("manutencao_id") REFERENCES "manutencoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
