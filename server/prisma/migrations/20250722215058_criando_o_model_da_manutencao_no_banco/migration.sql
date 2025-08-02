-- CreateEnum
CREATE TYPE "TipoManutencao" AS ENUM ('PREVENTIVA', 'CORRETIVA');

-- CreateEnum
CREATE TYPE "StatusManutencao" AS ENUM ('SOLICITADA', 'CANCELADA', 'CONCLUIDA', 'PENDENTE');

-- CreateTable
CREATE TABLE "manutencoes" (
    "codigo" SERIAL NOT NULL,
    "prazo" TIMESTAMP(3) NOT NULL,
    "status" "StatusManutencao" NOT NULL DEFAULT 'SOLICITADA',
    "tipo" "TipoManutencao" NOT NULL DEFAULT 'CORRETIVA',
    "descricaoSolicitada" TEXT NOT NULL,
    "descricaoAposFinalizada" TEXT,
    "usuario_solicitacao_id" INTEGER NOT NULL,
    "tecnico_responsavel_id" INTEGER NOT NULL,
    "data_solicitada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manutencoes_pkey" PRIMARY KEY ("codigo")
);

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_usuario_solicitacao_id_fkey" FOREIGN KEY ("usuario_solicitacao_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencoes" ADD CONSTRAINT "manutencoes_tecnico_responsavel_id_fkey" FOREIGN KEY ("tecnico_responsavel_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
